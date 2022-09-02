import TypingField from './components/TypingField';
import HomepageHeader from './components/HomepageHeader';
import LayoutWrapper from './components/LayoutWrapper';
import { Routes, Route } from "react-router-dom"
import About from "./components/About/About"

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  )
}

// !! needs refactoring to another file
function Home() {
  return (
    <LayoutWrapper>
      <HomepageHeader />
      <TypingField />
    </LayoutWrapper>
  );
}