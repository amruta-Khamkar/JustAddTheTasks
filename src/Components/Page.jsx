import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import Navi from './Navi'
 
function Page() {
 const [postsPerPage] = useState(5);
 const [offset, setOffset] = useState(1);
 const [posts, setAllPosts] = useState([]);
 const [pageCount, setPageCount] = useState(0)
 
 const getPostData = (data) => {
   return (
     data.map(post => <div className="container" key={post.id}>
         <ul>
             <li>User ID: {post.id}</li>
             <li>Title: {post.title}</li>
             </ul>
     </div>)
   )
 
 }
 
 const getAllPosts = async () => {
   const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`)
   const data = res.data;
   console.log(offset *postsPerPage ,( offset *postsPerPage )+ postsPerPage);

   const slice = data.slice(offset *postsPerPage ,( offset *postsPerPage )+ postsPerPage)
 
   // For displaying Data
   const postData = getPostData(slice)
 
   // Using Hooks to set value
   setAllPosts(postData)
   setPageCount(Math.ceil(data.length / postsPerPage))
 }
 
 const handlePageClick = (event) => {
   const selectedPage = event.selected;
   console.log("s",selectedPage)
   setOffset(selectedPage)
 };
 
 useEffect(() => {
   getAllPosts()
 }, [offset])
 
 return (
   <div className="main-app">
     {console.log("Page")}
    <Navi/>
     {/* Display all the posts */}
     {posts}
 
     {/* Using React Paginate */}
     <ReactPaginate
       previousLabel={"previous"}
       nextLabel={"next"}
    //    breakLabel={"..."}
    //    breakClassName={"break-me"}
       pageCount={pageCount}
       onPageChange={handlePageClick}
       containerClassName={"pagination justify-content-center"}
       pageClassName={"page-item"}
       pageLinkClassName={"page-link"}
       previousClassName={"page-item"}
       nextClassName={"page-item"}
       previousLinkClassName={"page-link"}
       nextLinkClassName={"page-link"}
       breakClassName={"page-item"}
       breakLinkClassName={"page-link"}
       subContainerClassName={"pages pagination"}
       activeClassName={"active"} />
   </div>
 );
}
 
export default Page;