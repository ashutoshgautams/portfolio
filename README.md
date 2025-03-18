# Portfolio

![Portfolio Banner](https://via.placeholder.com/1200x300/0f172a/3b82f6?text=Portfolio)

A unique interactive 3D portfolio website that serves as both a personal brand identity and a developer playground where users can visually interact with JavaScript functions in 3D.

## 🌟 Features

- **Interactive 3D Landing Page**: Stunning 3D visuals and animations
- **3D Code Playground**: Visualize JavaScript code as 3D objects
- **Drag-and-Drop Interface**: Intuitively create and connect code blocks
- **Real-Time Execution**: See your code results instantly
- **Dynamic User Portfolios**: Create a unique 3D portfolio under a subdomain
- **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **3D Rendering**: Three.js with React Three Fiber & Drei
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Post-Processing**: React Three Postprocessing

## 📋 Prerequisites

- Node.js 18.17.0 or later
- npm or yarn or pnpm

## 🚀 Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📂 Project Structure

```
code-in-3d-portfolio/
├── public/               # Static assets
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── [username]/   # Dynamic user portfolio routes
│   │   ├── about/        # About page
│   │   ├── playground/   # Code playground
│   │   ├── page.tsx      # Home page
│   │   └── layout.tsx    # Root layout
│   ├── components/       # React components
│   │   ├── 3d/           # Three.js components
│   │   ├── layout/       # Layout components
│   │   └── ui/           # UI components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions & store
│   └── types/            # TypeScript type definitions
└── README.md             # This file
```

## 🎮 How to Use the Playground

1. Navigate to the playground page
2. Add code blocks using the buttons on the left sidebar
3. Click and drag blocks to position them in 3D space
4. Double-click on a block to start creating a connection, then double-click on another block to complete the connection
5. Select a block to edit its code in the editor panel
6. Click "Execute Code" to run your code and see the results
7. Right-click on blocks or connections to delete them

## 🌐 Deployment

This project can be deployed on Vercel, Netlify, or any other platform that supports Next.js applications:

```bash
# Build the project
npm run build

# Start the production server
npm start
```

## 🧩 Creating a User Portfolio

To create your own user portfolio:

1. Navigate to `/[your-username]` (replace `[your-username]` with your desired username)
2. The system will create a skeleton portfolio
3. Customize your portfolio through the settings panel

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

Your Name - [@ashutoshgautams](https://twitter.com/ashutoshgautams) - email@example.com

Project Link: [https://github.com/ashutoshgautams/portfolio](https://github.com/ashutoshgautams/portfolio)

## 🙏 Acknowledgments

- [Three.js](https://threejs.org/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
- [Next.js](https://nextjs.org/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)