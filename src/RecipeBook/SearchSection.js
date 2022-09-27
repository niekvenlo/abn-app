export function SearchSection() {
  return (
    <div
      style={{ display: "flex", justifyContent: "space-between", gap: "1em" }}
    >
      <h2>Search</h2>
      <input
        type="text"
        defaultValue="Dummy"
        placeholder="Enter text to search"
        style={{ flexGrow: 1, fontSize: "1.2em", margin: "0.1em" }}
      />
    </div>
  );
}
