import type { ChangeEvent } from "react";

export function SearchBar({
  onSearch,
  showClearBtn,
  onClear,
}: {
  onSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  showClearBtn: boolean;
  onClear: () => void;
}) {
  return (
    <div className="form">
      <i className="fa fa-search"></i>
      <input
        type="text"
        className="form-control form-input"
        placeholder="Search accommodation..."
        onChange={onSearch}
      />
      {showClearBtn && (
        <span className="left-pan" onClick={onClear}>
          <i className="fa fa-close"></i>
        </span>
      )}
    </div>
  );
}
