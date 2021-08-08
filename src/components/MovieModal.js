import { useState } from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import firebase from "firebase";
import { postMovieAPI } from "../actions";

const MovieModal = (props) => {
  const [editorText, setEditorText] = useState(" ");
  const [editorTitle, setEditorTitle] = useState(" ");
  const [shareImage, setShareImage] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [assetArea, setAssetArea] = useState("");

  const handleChange = (e) => {
    const image = e.target.files[0];

    if (image === "" || image === undefined) {
      alert(`not an image,the file is a ${typeof image}`);
      return;
    }
    setShareImage(image);
  };
  const switchAssetArea = (area) => {
    setShareImage("");
    setVideoLink("");
    setAssetArea(area);
  };

  const postMovie = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }

    const payload = {
      title:editorTitle,
      image: shareImage,
      video: videoLink,
      description: editorText,
      
    };

    props.postMovie(payload);
    reset(e);
  };

  const reset = (e) => {
    setEditorText("");
    setEditorTitle("");
    setShareImage("");
    setVideoLink("");
    setAssetArea("");
    props.handleClick(e);
  };
  return (
    <>
      {props.showModal === "open" && (
        <Container>
          <Content>
            <Header>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src="/images/movie-icons.svg"
                  alt="MOVIES"
                  style={{ height: 50 }}
                />
                <h2 style={{ marginLeft: 10 }}>ADD MOVIE +</h2>
              </div>
              <button onClick={(event) => reset(event)}>
                <img src="/images/close-icon.svg" alt="" />
              </button>
            </Header>
            <SharedContent>
              <Editor>
                <textarea
                  style={{ padding: 10 }}
                  value={editorTitle}
                  onChange={(e) => setEditorTitle(e.target.value)}
                  placeholder="Enter Title of your Movie!"
                  autoFocus={true}
                ></textarea>

                <textarea
                  style={{ padding: 10 }}
                  value={editorText}
                  onChange={(e) => setEditorText(e.target.value)}
                  placeholder="Enter Description of your Movie!"
                  autoFocus={true}
                ></textarea>
                   <br/>
                
                {assetArea === "image" ? (
                  <UploadImage>
                    <input
                      type="file"
                      accept="image/gif, image/jpeg ,image/png"
                      name="image"
                      id="file"
                      style={{ display: "none" }}
                      onChange={handleChange}
                    />
                    <button
                      style={{
                        background: "#fff",
                        border: "1px solid green",
                        borderRadius: "20px",
                      }}
                    >
                     
                      <label htmlFor="file">
                        Select an thumbnail of Your Movie
                      </label>
                    </button><br/><br/>
                    {shareImage && (
                      <img src={URL.createObjectURL(shareImage)} />
                    )}
                  </UploadImage>
                 
                ) : (
                  assetArea === "media" && (
                    <>
                      <input
                        type="text"
                        placeholder="Please input a video link"
                        value={videoLink}
                        onChange={(e) => setVideoLink(e.target.value)}
                        style={{ borderRadius: "20px" }}
                      />
                      {videoLink && (
                        <ReactPlayer width={"100%"} url={videoLink} />
                      )}
                    </>
                  )
                )}
              </Editor>
            </SharedContent>
            <SharedCreation>
              <AttachAssets>
                <AssetButton onClick={() => switchAssetArea("image")}>
                  <img src="/images/shared-image.svg" alt="" />
                </AssetButton>
                <AssetButton onClick={() => switchAssetArea("media")}>
                  <img src="/images/shared-video.svg" alt="" />
                </AssetButton>
              </AttachAssets>
              <SharedComment>
                <AssetButton>
                  <img src="/images/shared-comment.svg" alt="" />
                  ORIGINAL
                </AssetButton>
              </SharedComment>
              <PostButton
                style={{backgroundColor:'#0a66c2'}}
                disabled={!editorText ? true : false}
                onClick={(event) => postMovie(event)}
              >
                Add Movie
              </PostButton>
            </SharedCreation>
          </Content>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  color: black;
  background-color: rgba(0, 0, 0, 0.8);
  animation: fadeIn 0.3s;
`;
const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: white;
  max-height: 90%;
  overflow: initial;
  border-radius: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: block;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    height: 40px;
    width: 40px;
    min-width: auto;
    border: none;
    background-color: white;
    color: rgba(0, 0, 0, 0.15);
    svg,
    img {
      pointer-events: none;
    }
  }
`;

const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;


const SharedCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 16px;
`;

const AssetButton = styled.button`
  display: flex;
  align-items: center;
  height: 40px;
  min-width: auto;
  color: rgba(0, 0, 0, 0.5);
  border: none;
  background-color: white;
  img {
    margin-right: 5px;
  }
`;

const AttachAssets = styled.div`
  display: flex;
  align-items: center;
  padding-right: 8px;

  ${AssetButton} {
    width: 40px;
  }
`;

const SharedComment = styled.div`
  padding-left: 8px;
  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.15);
  ${AssetButton} {
    svg {
      margin-right: 5px;
    }
  }
`;

const PostButton = styled.button`
  min-width: 60px;
  border-radius: 20px;
  padding-left: 16px;
  padding-right: 16px;
  background: ${(props) => (props.disabled ? "rgba(0,0,0,0.08)" : "#0a66c2")};
  color: ${(props) => (props.disabled ? "rgba(1,1,1,0.2)" : "white")};
  border: none;
  background-color: white;

  &:hover {
    background: ${(props) => (props.disabled ? "rgba(0,0,0,0.08)" : "#004182")};
  }
`;

const Editor = styled.div`
  padding: 12px 24px;
  border-radius: 20px;
  textarea {
    width: 100%;
    min-height: 40px;
    resize: none;
    border-radius: 20px;
  }
  input {
    width: 100%;
    height: 35px;
    font-size: 16px;
    margin-bottom: 20px;
  }
`;

const UploadImage = styled.div`
  text-align: center;
  img {
    width: 100%;
  }
`;

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  postMovie: (payload) => dispatch(postMovieAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieModal);
