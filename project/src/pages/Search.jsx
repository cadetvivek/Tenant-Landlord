// import React, { useState } from 'react';

// const Search = () => {
//   // ... (keep all the existing state and logic)
//   const [inputValue, setInputValue] = useState('');
//   const [responseField, setResponseField] = useState([]);
//   const [imageContainer, setImageContainer] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const numberPerPage = 4;

//   const url = 'https://www.googleapis.com/customsearch/v1?';
//   const apiKey = 'key=AIzaSyDiAg6Yx4YPLvlLDwPXH0pD2blULPBk03A';
//   const cx = '&cx=008993671637674012003:y7jt0xhysdv';

//   const validateForm = () => {
//     if (!inputValue.trim()) {
//       return false;
//     }
//     return true;
//   };

//   const getSuggestions = async () => {
//     const query = inputValue;
//     const endpoint = `${url}${apiKey}${cx}&q=${query}`;

//     try {
//       const response = await fetch(endpoint);
//       const data = await response.json();
//       if (data.items) {
//         paginateResults(data.items);
//       } else {
//         setResponseField(['Try again! There were no suggestions found!']);
//         setImageContainer([]);
//       }
//     } catch (error) {
//       setResponseField(['Error fetching data']);
//       setImageContainer([]);
//     }
//   };

//   const paginateResults = (data) => {
//     const list = [];
//     const imgList = [];

//     data.forEach((item) => {
//       const imageUrl = item.pagemap?.cse_image?.[0]?.src ||
//         'https://www.ggf.org.uk/wp-content/uploads/2018/03/jpg-icon.png';

//       imgList.push(
//         <img src={imageUrl} alt="result" key={item.link} height="120px" width="auto" />
//       );

//       list.push(
//         <div className="searchResultItem" key={item.link}>
//           <div className="resultItemHeader">
//             <a href={item.link} target="_blank" rel="noopener noreferrer">
//               {item.title}
//             </a>
//           </div>
//           <div className="resultItemBody">{item.snippet}</div>
//         </div>
//       );
//     });

//     setResponseField(list);
//     setImageContainer(imgList);
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       getSuggestions();
//     }
//   };

//   return (
//     <div className=" bg-cyan-100">
//       <header className="bg-teal-300 shadow-md">
//         <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between">
//             <div className="flex-shrink-0">
//               <h3 className="text-2xl font-bold text-indigo-600">Search properties</h3>
//             </div>
//             <form className="w-full max-w-2xl ml-4" onSubmit={handleSearch}>
//               <div className="flex gap-2">
//                 <input
//                   className="flex-1 px-4 py-2 border-2 border-indigo-200 rounded-lg focus:outline-none focus:border-indigo-500"
//                   placeholder="Search here everything about properties."
//                   value={inputValue}
//                   onChange={(e) => setInputValue(e.target.value)}
//                 />
//                 <button
//                   type="submit"
//                   className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-200"
//                 >
//                   Search
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//           {imageContainer.map((img, index) => (
//             <div key={index} className="aspect-square bg-white rounded-lg shadow-sm overflow-hidden">
//               {img}
//             </div>
//           ))}
//         </div>

//         <div className="space-y-4">
//           {responseField.map((item, index) => (
//             <div key={index} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
//               {item}
//             </div>
//           ))}
//         </div>

//         <div className="mt-6 flex justify-center gap-2">
//           <button
//             onClick={() => setCurrentPage(1)}
//             className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200"
//           >
//             &lt;&lt;
//           </button>
//           <button
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200"
//           >
//             &lt;
//           </button>
//           <button
//             onClick={() => setCurrentPage((prev) => prev + 1)}
//             className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200"
//           >
//             &gt;
//           </button>
//           <button
//             onClick={() => setCurrentPage(100)}
//             className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200"
//           >
//             &gt;&gt;
//           </button>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Search;



import React, { useState } from 'react';

const Search = () => {
  const [inputValue, setInputValue] = useState('');
  const [responseField, setResponseField] = useState([]);
  const [imageContainer, setImageContainer] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const numberPerPage = 4;

  const url = 'https://www.googleapis.com/customsearch/v1?';
  const apiKey = 'key=AIzaSyDiAg6Yx4YPLvlLDwPXH0pD2blULPBk03A';
  const cx = '&cx=008993671637674012003:y7jt0xhysdv';

  const validateForm = () => inputValue.trim() !== '';

  const getSuggestions = async () => {
    const query = inputValue;
    const endpoint = `${url}${apiKey}${cx}&q=${query}`;

    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      if (data.items) {
        paginateResults(data.items);
      } else {
        setResponseField(['Try again! There were no suggestions found!']);
        setImageContainer([]);
      }
    } catch (error) {
      setResponseField(['Error fetching data']);
      setImageContainer([]);
    }
  };

  const paginateResults = (data) => {
    const list = [];
    const imgList = [];

    data.forEach((item) => {
      const imageUrl = item.pagemap?.cse_image?.[0]?.src ||
        'https://www.ggf.org.uk/wp-content/uploads/2018/03/jpg-icon.png';

      imgList.push(
        <img src={imageUrl} alt="result" key={item.link} className="w-full h-auto rounded-lg" />
      );

      list.push(
        <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition duration-200" key={item.link}>
          <div className="font-semibold text-indigo-600 truncate">
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              {item.title}
            </a>
          </div>
          <div className="text-gray-600 mt-2">{item.snippet}</div>
        </div>
      );
    });

    setResponseField(list);
    setImageContainer(imgList);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (validateForm()) {
      getSuggestions();
    }
  };

  return (
    <div className="bg-cyan-100 min-h-screen">
      <header className="bg-teal-300 shadow-md py-4 px-6 flex flex-col sm:flex-row items-center justify-between">
        <h3 className="text-xl font-bold text-indigo-600">Search Properties</h3>
        <form className="w-full max-w-lg mt-4 sm:mt-0" onSubmit={handleSearch}>
          <div className="flex gap-2">
            <input
              className="flex-1 px-2 py-1 border-2 border-indigo-200 rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Search here everything about properties."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              type="submit"
              className="px-3 py-1 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              Search
            </button>
          </div>
        </form>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {imageContainer.map((img, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
              {img}
            </div>
          ))}
        </div>

        <div className="space-y-4">
          {responseField.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition duration-200">
              {item}
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => setCurrentPage(1)}
            className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200"
          >
            &lt;&lt;
          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200"
          >
            &lt;
          </button>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200"
          >
            &gt;
          </button>
          <button
            onClick={() => setCurrentPage(100)}
            className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200"
          >
            &gt;&gt;
          </button>
        </div>
      </main>
    </div>
  );
};

export default Search;