import React, { useState } from "react";
import Accordion from "./components/Accordion";
import Dropdown from "./components/Dropdown";
import Search from "./components/Search";

const items = [
  {
    title: "What is React?",
    content: "React is a frontend Javascript framework",
  },
  {
    title: "Why use React?",
    content: "React is a favorite JS library among engineers",
  },
  {
    title: "How do you use React?",
    content: "You use React by creating components",
  },
];

const options = [
  {
    label: 'The Color Red',
    value: 'red'
  },
  {
    label: 'The Color Green',
    value: 'green'
  },
  {
    label: 'A Shade of Blue',
    value: 'blue'
  },
];


const App = () => {

  const [selected, setSelected] = useState(options[0]);
  const [showDropdown, setShowDropdown] = useState(true);

  return (
    <div>
      {/* <Accordion items={items} /> */}
      {/* <Search /> */}

      <button onClick={() => setShowDropdown(!showDropdown)}>Toggle Dropdown</button>
      {
        showDropdown ? <Dropdown
          selected={selected}
          onSelectedChange={setSelected}
          options={options}
        /> : null
      }

      {showDropdown ? <div style={{ color: selected.value }}>This text color is {selected.value}</div> : null}
    </div>
  );
};

export default App;
