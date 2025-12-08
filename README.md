# Truestate Assignment

## 1. Overview
Truestate Assignment is a property transaction management system that allows users to view and analyze transactions data. It includes functionalities such as search, filter, sorting, and pagination for better data exploration. The project consists of a Node.js + Express backend and a React.js frontend.

## 2. Tech Stack
- **Frontend:** React.js, React Router, Axios  
- **Backend:** Node.js, Express  
- **Database / Data:** CSV and JSON files (Git LFS for large files)  
- **Other Tools:** Git, GitHub, NPM

## 3. Search Implementation Summary
The backend exposes search endpoints that allow querying transactions by product name, customer name, or other attributes. The frontend uses controlled input fields and sends search queries to the API, displaying real-time results.

## 4. Filter Implementation Summary
Filters are implemented both on the backend and frontend. Users can filter transactions by categories, date ranges, and numerical ranges (e.g., quantity or amount). The frontend provides dropdowns and range inputs to apply filters, which are sent as query parameters to the API.

## 5. Sorting Implementation Summary
Sorting is supported for key fields such as Date (Newest First), Quantity, and Customer Name (A–Z). The backend handles sorting based on query parameters, while the frontend allows users to select the sorting criteria via dropdowns, preserving active search and filters.

## 6. Pagination Implementation Summary
Pagination is implemented on the backend using `page` and `limit` query parameters to limit results per page. The frontend provides navigation controls to move between pages while maintaining search, filter, and sorting state.

## 7. Setup Instructions
1. Clone the repository:  
   ```bash
   git clone https://github.com/nandhiniannika/Truestate_Assignment.git
   cd Truestate_Assignment
