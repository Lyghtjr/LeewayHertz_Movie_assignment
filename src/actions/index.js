
import db, { storage } from "../firebase";
import { SET_USER,SET_LOADING_STATUS,GET_MOVIES} from "./actionType";

export const SetUser = (payload) => ({
    type: SET_USER,
    user: payload,
  });
  
  export const setLoading = (status) => ({
      type:SET_LOADING_STATUS,
      status:status,
  });
  
  export const getArticles = (payload) => ({
      type:GET_MOVIES,
      payload:payload,
  })
  

export function postMovieAPI(payload) {
    return (dispatch) => {
        dispatch(setLoading(true));
  
      if (payload.image != "") {
        const upload = storage
          .ref(`images/${payload.image.name}`)
          .put(payload.image);
        upload.on("state_changed", (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`progress: ${progress}%`);
          if(snapshot.state === 'RUNNING'){
              console.log(`progress: ${progress}%`)
          }
        },error => console.log(error.code),
        async () =>{
            const downloadURL=await upload.snapshot.ref.getDownloadURL();
            db.collection('movies').add({
                description: payload.description,
                title:payload.title,
                subTitle:"Latest • 1h 39m • Family, Comedy, Action,Love",
                backgroundImg:downloadURL,
                titleImg:"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/A31BE6502DC7A3A01DAF58DF7E91AB6FF598A078C8FA88A1DB2D7B7E25439464/scale?width=1440&aspectRatio=1.78",
                video: " ",
                cardImg: downloadURL,
                type:"original"
            
               
  
          });
          dispatch(setLoading(false));
        });
      } else if(payload.video){
       
          db.collection('movies').add({
             
            description: payload.description,
            title:payload.title,
            subTitle:"Latest • 1h 39m • Family, Comedy, Action,Love",
            backgroundImg:payload.video,
            titleImg:"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/A31BE6502DC7A3A01DAF58DF7E91AB6FF598A078C8FA88A1DB2D7B7E25439464/scale?width=1440&aspectRatio=1.78",
            cardImg:payload.video,
            type:"original"
                 
          });
          dispatch(setLoading(false));
      }
    };
  }
  
