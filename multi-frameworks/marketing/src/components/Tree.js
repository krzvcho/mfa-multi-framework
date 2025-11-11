import React, { useState, useMemo } from "react";
import TreeView, { flattenTree } from "react-accessible-treeview";
import { optimizedFlattenTree } from "./treeUtils";

function MyTree({sourceData, useOptimized = true}) {
  // keep expandedIds controlled and default to an empty array
  const [expandedIds, setExpandedIds] = useState([]);

  // Memoize the flattened data to prevent unnecessary recalculations
  // This ensures the tree data is only flattened when the folder structure changes
  const data = useMemo(() => {
    return useOptimized ? optimizedFlattenTree(sourceData) : flattenTree(sourceData);
  }, [sourceData, useOptimized]);

  console.log('render called', {useOptimized, dataLength: data.length});
  return (
    <div className="tree-reset">
      {/* scoped CSS reset so the tree's internal ul/li styles don't inherit global list styles */}
      <style>{`
        .tree-reset ul, .tree-reset ol { margin: 0; padding: 0; list-style: none; }
        .tree-reset li { margin: 0; padding: 0; }
      `}</style>

      <TreeView
        data={data}
        aria-label="Controlled expanded node tree"
        expandedIds={expandedIds}
        defaultExpandedIds={[1]}
        nodeRenderer={({
          element,
          isBranch,
          isExpanded,
          isDisabled,
          getNodeProps,
          level,
          handleExpand,
        }) => {
          return (
            <div
              {...getNodeProps({ onClick: handleExpand })}
              style={{
                marginLeft: 40 * (level - 1),
                opacity: isDisabled ? 0.5 : 1,
              }}
            >
              {isBranch && <ArrowIcon isOpen={isExpanded} />}
              <span className="name">
                {element.name}-{element.id}
              </span>
            </div>
          );
        }}
      />
    </div>
  );
}

const ArrowIcon = ({ isOpen, className }) => {
  const baseClass = "arrow";
  // build classes manually instead of using cx()
  const classes = [
    baseClass,
    isOpen ? `${baseClass}--open` : `${baseClass}--closed`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // simple transform for open/closed visual state
  const style = {
    transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
    transition: "transform 120ms ease-in-out",
    display: "inline-block",
    verticalAlign: "middle",
  };

  // Inline SVG chevron replaces IoMdArrowDropright
  return (
    <svg
      className={classes}
      style={style}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" fill="currentColor" />
    </svg>
  );
};

export default MyTree;