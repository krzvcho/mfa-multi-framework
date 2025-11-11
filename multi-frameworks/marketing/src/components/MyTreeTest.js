import React, { useState, useRef, useEffect } from 'react';
import { generateTree } from './treeUtils';
import MyTree from './Tree';

// Example tree data with 3 levels: 1000 children at level 1, each with 2 children at level 2, each with 2 children at level 3
const someData = generateTree([1000, 2, 2], 'Root');

const containerStyle = {
  display: 'flex',
  flexDirection: 'row',
  gap: '24px', // optional spacing between trees
};

const treeStyle = {
  width: '300px',
  height: '600px', // set a fixed height for scrolling
  overflowY: 'auto', // enable vertical scroll
};

const ITEMS_PER_PAGE = 50;

const MyTreeTest = () => {
  const [page, setPage] = useState(0);
  const treeRef = useRef(null);

  const visibleData = {
    ...someData,
    children: someData.children.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE),
  };

  useEffect(() => {
    const handleScroll = () => {
      const el = treeRef.current;
      if (el && el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
        setPage((prev) =>
          prev < Math.floor(someData.children.length / ITEMS_PER_PAGE)
            ? prev + 1
            : prev
        );
        // Optionally, scroll back to top after loading new batch:
        if (el) el.scrollTop = 0;
      }
    };
    const el = treeRef.current;
    if (el) el.addEventListener('scroll', handleScroll);
    return () => {
      if (el) el.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div style={containerStyle}>
      <div style={treeStyle} ref={treeRef}>
        <MyTree sourceData={visibleData} useOptimized={true} />
      </div>
      <div style={treeStyle}>
        <MyTree sourceData={visibleData} useOptimized={false} />
      </div>
    </div>
  );
};

export default MyTreeTest;
