# 🎓 College Exam Seat Planner

A React-based web application for efficiently allocating exam classrooms that prioritizes lower floors.

## 🚀 Features

- ✅ Add classrooms with capacity, floor number, and washroom availability
- ✅ View all added classrooms in a sortable table
- ✅ Allocate minimum number of classrooms for exams
- ✅ Prioritize lower floor classrooms
- ✅ Real-time validation and error handling
- ✅ Responsive design for all devices

## 📦 Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Run development server:**
```bash
npm run dev
```

3. **Open your browser:**
   - The app will run at `http://localhost:5173`

## 🐛 Troubleshooting Input Issues

If you cannot type in the input fields, try these solutions:

### Solution 1: Clear Browser Cache
- Press `Ctrl + Shift + Delete` (Windows) or `Cmd + Shift + Delete` (Mac)
- Clear cached images and files
- Reload the page

### Solution 2: Check for CSS Conflicts
If you have any browser extensions (like ad blockers), try disabling them temporarily.

### Solution 3: Force Refresh
- Press `Ctrl + F5` (Windows) or `Cmd + Shift + R` (Mac)

### Solution 4: Verify Input Attributes
The inputs should have these properties:
```jsx
value={formData.roomId}
onChange={handleInputChange}
```

### Solution 5: Check Console Errors
- Press `F12` to open Developer Tools
- Check the Console tab for any errors
- Share any errors you see

##  Project Structure

```
exam-seat-planner/
├── src/
│   ├── App.jsx          # Main application component
│   ├── App.css          # Styling
│   └── main.jsx         # React entry point
├── index.html           # HTML template
├── package.json         # Dependencies
└── vite.config.js       # Vite configuration
```

## 💡 How to Use

1. **Add Classrooms:**
   - Enter Room ID (e.g., "R101", "LAB-A")
   - Enter Capacity (number of seats)
   - Enter Floor Number (0 for ground floor)
   - Check "Near Washroom" if applicable
   - Click "ADD CLASSROOM"

2. **View Classrooms:**
   - All classrooms are displayed in a table
   - Sorted by floor number
   - Delete any classroom using the Delete button

3. **Allocate Exam Seats:**
   - Enter total number of students
   - Click "Allocate Classrooms"
   - View the allocation result with room details

## 🔧 Algorithm

The application uses a **Greedy Algorithm** for seat allocation:

1. Sort classrooms by floor number (ascending)
2. Iterate through classrooms starting from the lowest floor
3. Allocate seats until total student count is satisfied
4. Return error if total capacity is insufficient

## 🎨 Technologies Used

- **Frontend:** React.js 18.3
- **Build Tool:** Vite 6.0
- **Styling:** Pure CSS with gradients
- **State Management:** React Hooks (useState)

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🤝 Contributing

Feel free to fork this project and submit pull requests!

## 📄 License

MIT License - feel free to use this project for educational purposes.

---

**Note:** If inputs are not working, make sure:
- React is properly imported
- State is correctly initialized
- Event handlers are bound properly
- No CSS is blocking pointer events
