// "use client";

// import { useParams } from "next/navigation";
// import React, { useEffect, useState } from "react";

// interface User {
//   image: string;
//   id: string;
//   description: string;
//   title: string;
// }

// const Page = () => {
//   const { id } = useParams(); // id is a string
//   const [blogs, setBlogs] = useState<User[]>([]);
//   const [selectedBlog, setSelectedBlog] = useState<User | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           "https://678a46d6dd587da7ac297368.mockapi.io/blog"
//         );
//         const data: User[] = await response.json();
//         setBlogs(data);

//         // Find the blog post with the matching id
//         const blogPost = data.find((blog) => blog.id === id);
//         setSelectedBlog(blogPost || null);
//       } catch (error) {
//         console.error("There was an error fetching the blogs:", error);
//       }
//     };
//     fetchData();
//   }, [id]);

//   if (!selectedBlog) {
//     return <div className="text-center p-8">Blog post not found.</div>;
//   }

//   return (
//     <div className="max-w-8xl mx-auto p-7 sm:p-8 min-h-screen">
//       <div className="flex flex-col items-center">
//         <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-8">
//           <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full">
//             <img
//               className="object-cover" width={600} height={500}
//               src={selectedBlog.image || "https://via.placeholder.com/150"}
//               alt={selectedBlog.title || "blog image"}
//             />
//             <div className="p-4">
//               <h3 className="text-xl font-semibold text-gray-800">
//                 {selectedBlog.title}
//               </h3>
//               <p className="text-xl">{selectedBlog.description}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;
// "use client";

// import { useParams } from "next/navigation";
// import React, { useEffect, useState } from "react";

// interface User {
//   image: string;
//   id: string;
//   description: string;
//   title: string;
// }

// const Page = () => {
//   const { id } = useParams();
//   const [blogs, setBlogs] = useState<User[]>([]);
//   const [selectedBlog, setSelectedBlog] = useState<User | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           "https://678a46d6dd587da7ac297368.mockapi.io/blog"
//         );
//         const data: User[] = await response.json();
//         setBlogs(data);

//         const blogPost = data.find((blog) => blog.id === id);
//         setSelectedBlog(blogPost || null);
//       } catch (error) {
//         console.error("There was an error fetching the blogs:", error);
//       }
//     };
//     fetchData();
//   }, [id]);

//   if (!selectedBlog) {
//     return (
//       <div className="flex items-center justify-center min-h-screen text-gray-700 text-lg">
//         Blog post not found.
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
//       <div className="flex flex-col w-100 h-100 items-center justify-center">
//         <div className="w-full max-w-3xl bg-white rounded-xl shadow-md overflow-hidden">
//           <img
//             className="w-full h-64 object-cover"
//             src={selectedBlog.image || "https://via.placeholder.com/600x400"}
//             alt={selectedBlog.title || "Blog Image"}
//           />
//           <div className="p-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-3">
//               {selectedBlog.title}
//             </h3>
//             <p className="text-lg text-gray-700">{selectedBlog.description}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;

"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface User {
  image: string;
  id: string;
  description: string;
  title: string;
}

const Page = () => {
  const { id } = useParams();
  const [blogs, setBlogs] = useState<User[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://678a46d6dd587da7ac297368.mockapi.io/blog"
        );
        const data: User[] = await response.json();
        setBlogs(data);

        const blogPost = data.find((blog) => blog.id === id);
        setSelectedBlog(blogPost || null);
      } catch (error) {
        console.error("There was an error fetching the blogs:", error);
      }
    };
    fetchData();
  }, [id]);

  if (!selectedBlog) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-700 text-lg">
        Blog post not found.
      </div>
    );
  }

  return (
    <div className=" p-6 min-h-screen flex items-center bg-gray-50">
      <div className="bg-gray-200  flex flex-col md:flex-row w-full max-w-8xl mx-auto ">
        {/* Image Section */}
        <div className="w-full md:w-1/2">
          <img
            className="w-full h-full object-cover"
            src={selectedBlog.image || "https://via.placeholder.com/600x400"}
            alt={selectedBlog.title || "Blog Image"}
          />
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
          <h3 className="text-3xl font-bold text-gray-900">{selectedBlog.title}</h3>
          <p className="text-gray-600 mt-4 leading-relaxed">
            {selectedBlog.description}
          </p>
         
        </div>
      </div>
    </div>
  );
};

export default Page;
