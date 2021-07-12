import React,{useState,useEffect} from 'react'
import Header from './components/header';
import ImageCont from './components/imageCont';
import constants from "./components/constants";
import {  checkHttpStatus, parseJSON } from "./components/utils";
import './App.css';

export default function App() {

  //States Defined
const [data, setData] = useState([])

  const [state, setState] = useState( {
    searchText: "",
    imageList: [],
    pageNumber: 1,
    showPopUp: false,
    popUpImage: null,
    queries: queriesFromStorage ? queriesFromStorage : []
  })

  var queriesFromStorage = JSON.parse(localStorage.getItem(constants.STORAGE_KEY));

 // const [Data, setData] = useState(


useEffect(() => {
  
 let arr=[];
   fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=a2bd2bb7194e9ff7b35827fe388f511f&per_page=16&page=1&format=json&nojsoncallback=1`)
  .then(parseJSON)
  .then(dataApi=>dataApi.photos.photo.map(i=>arr.push([`https://live.staticflickr.com/${i.server}/${i.id}_${i.secret}_q.jpg`])))
  .then(()=>setData(arr))
 
},[])




  

//             //Functions
  function onSearchInputChange(evt) {
		const searchText = evt.currentTarget.value;
		setState({ searchText });
		const trimmedText = searchText.replace(/\s+$/, "");
setTimeout(() => {
  if (trimmedText.length>=2) 
    {
      let arr=[];
      fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=a2bd2bb7194e9ff7b35827fe388f511f&accuracy=1&safe_search=1&content_type=1&tags=${trimmedText}&text=${trimmedText}&per_page=16&page=1&format=json&nojsoncallback=1`)
      .then(parseJSON)
      .then(dataApi=>dataApi.photos.photo.map(i=>arr.push([`https://live.staticflickr.com/${i.server}/${i.id}_${i.secret}_q.jpg`])))
  .then(()=>setData(arr))
  updateLocalStorage(trimmedText)
    }

}, 2000);
}

useEffect(() => {
		window.onscroll = (() => {
			if (scrollAreaAvailable()) return;
			handleScroll();
		}, 1000);
  return () => {
    window.onscroll = undefined;
  }
})

function getScrollTop() {
	return window.pageYOffset !== undefined
		? window.pageYOffset
		: (document.documentElement || document.body.parentNode || document.body).scrollTop;
}


function scrollAreaAvailable() {
	return getScrollTop() < getDocumentHeight() - window.innerHeight;
}


function getDocumentHeight() {
	const body = document.body;
	const html = document.documentElement;
  console.log(Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight));
	return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
}


	function handleScroll() {
		// let url = constants.BASE_URL + "&text=" + state.searchText + "&page=" + (state.pageNumber + 1);
		let url = `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=a2bd2bb7194e9ff7b35827fe388f511f&per_page=12&page=${state.pageNumber}&format=json&nojsoncallback=1`
    console.log(url);
		fetch(url)
			.then(checkHttpStatus)
			.then(parseJSON)
			.then(resp => {
				resp.photos.photo.forEach(photo => state.imageList.push(photo));
				setState({
					pageNumber: resp.photos.page,
					imageList: state.imageList
				});
			})
			.catch(err => {
				console.log(err);
			});
	}



function updateLocalStorage(txt) {
  localStorage.setItem("lastSrch", JSON.stringify(txt));
}


  return (
    <div className="App">
    
     <Header id="srch" lsData={state.queries} onSearchInputChange={onSearchInputChange} />
   
    {data.map((i,id)=>{
      return(
      <>
     <div style={{display:'inline-block'}} key={id}>
     <ImageCont  imgData={i}  />
    </div>


    </>)
})}
    </div>
  
  );
}


