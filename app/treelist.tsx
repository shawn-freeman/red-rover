export  function TreeList({ nodes }) {
  if (!nodes?.length) return null;
  return (
    <ul className="ml-4">
      {nodes.map((n, i) => (
        <div key={`${n.name}-${i}`}>
          {"  ".repeat(n.indent)}{`- `}{n.name}
          {n.children && n.children.length > 0 && (
            <div className="ml-4">
              <TreeList nodes={n.children} />
            </div>
          )}
        </div>
      ))}
    </ul>
  );
};
