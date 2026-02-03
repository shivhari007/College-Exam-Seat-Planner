# 🔍 Troubleshooting Input Issues

## Problem: Cannot Type in Input Fields

### Quick Fixes:

1. **Check Browser Console (F12)**
   - Look for any JavaScript errors
   - You should see "Input changed:" logs when typing

2. **Verify the Fix is Applied**
   - Open `src/App.jsx`
   - Check that inputs have these exact attributes:
   ```jsx
   value={formData.roomId}
   onChange={handleInputChange}
   name="roomId"
   ```

3. **Clear Cache & Hard Reload**
   ```
   Windows: Ctrl + Shift + R
   Mac: Cmd + Shift + R
   ```

4. **CSS Pointer Events Issue**
   - Open `src/App.css`
   - Find the input styles
   - Make sure it includes:
   ```css
   pointer-events: auto;
   position: relative;
   z-index: 1;
   ```

5. **Test with This Simple Component**
   Replace the entire `App.jsx` temporarily with this test:
   ```jsx
   import { useState } from 'react'

   function App() {
     const [test, setTest] = useState('')
     
     return (
       <div style={{padding: '50px'}}>
         <h1>Test Input</h1>
         <input 
           type="text" 
           value={test} 
           onChange={(e) => setTest(e.target.value)}
           style={{
             padding: '10px',
             fontSize: '16px',
             border: '2px solid blue'
           }}
         />
         <p>You typed: {test}</p>
       </div>
     )
   }

   export default App
   ```
   
   If this works, then the issue is with the CSS or form structure.

### Common Issues:

#### Issue 1: React StrictMode Double Rendering
**Solution:** This is normal behavior in development, not a bug.

#### Issue 2: Autocomplete Conflicts
**Solution:** Add `autoComplete="off"` to inputs:
```jsx
<input
  type="text"
  name="roomId"
  value={formData.roomId}
  onChange={handleInputChange}
  autoComplete="off"
/>
```

#### Issue 3: CSS Overlay Blocking Inputs
**Solution:** Check if any element has high `z-index` covering the form.

#### Issue 4: Browser Extension Interference
**Solution:** 
- Open in Incognito/Private mode
- Disable all extensions temporarily

### Debug Checklist:

- [ ] Console shows "Input changed:" logs when typing
- [ ] No JavaScript errors in console
- [ ] Input has `value` and `onChange` props
- [ ] CSS doesn't have `pointer-events: none`
- [ ] No overlay elements blocking the form
- [ ] Latest code is loaded (hard refresh)

### Still Not Working?

1. **Share the console errors** (if any)
2. **Check Network tab** - is React loading?
3. **Try the test component** above
4. **Inspect element** - click on input and check its styles

### Working Configuration:

**App.jsx (Input section):**
```jsx
<input
  type="text"
  id="roomId"
  name="roomId"
  value={formData.roomId}
  onChange={handleInputChange}
  placeholder="e.g., R101, LAB-A"
  required
/>
```

**App.css (Input styles):**
```css
.form-group input[type="text"],
.form-group input[type="number"] {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  pointer-events: auto;
  position: relative;
  z-index: 1;
}
```

### Last Resort:

If nothing works, create a new Vite project:
```bash
npm create vite@latest my-exam-planner -- --template react
cd my-exam-planner
npm install
```

Then copy the App.jsx and App.css files into the new project.
