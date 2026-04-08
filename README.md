SWE Summer Intern Task Submission
🌌 Cosmos Calendar
A visually immersive and interactive calendar built with React + Framer Motion, featuring constellation animations, range selection, notes, and dynamic national holiday insights.
✨ Features
Calendar System
* Monthly calendar view with navigation
* Weekday headers (Sun–Sat)
* Year navigation support
* Range selection (start → end dates)
Visual Experience
* Animated starfield background
* Constellation paths connecting selected dates
* Smooth hover interactions using Framer Motion

Notes System
* Add notes to any selected date
* Notes persist within session
* Visual indicators (🟡 dot) for saved notes

National Holidays
* Highlights official Indian holidays:
  * Republic Day 🇮🇳
  * Independence Day 🇮🇳
  * Gandhi Jayanti 🕊
  * Labour Day 🛠
  * Christmas 🎄
  * New Year 🎉
* Click on a holiday to view:
  * 📖 Description
  * 🖼 Relevant image
  * Interactive popup modal

🎯 Smart UI Features
* Holiday labels inside date cells
* Energy glow effects per day
* Responsive grid layout
* Scrollable content without layout breaking

🛠 Tech Stack
* React (Next.js - Client Components)
* Framer Motion (animations)
* Tailwind CSS (styling)


🚀 Getting Started

 1. Clone the repo

```bash
git clone https://github.com/mariahashmii/takeuforward_sweInternTask.git
cd takeuforward_sweInternTask
```

2. Install dependencies

```bash
npm install
```

 3. Run locally

```bash
npm run dev
```

---

📁 Project Structure

```
/app
  └── CosmosCalendar.jsx   # Main calendar component
```


🎨 Key Concepts Implemented
* React state management
* Dynamic calendar generation (Date API)
* Conditional rendering (notes, holidays, ranges)
* DOM-based coordinate mapping (constellation paths)
* UI/UX design with animations

🚀 Future Improvements
* Persistent storage (localStorage / database)
* Drag-to-select date ranges
* iPhone-style calendar UI
* Holiday API integration
* Dark/Light theme toggle

🙌 Author
Maria Hashmi
GitHub: https://github.com/mariahashmii
