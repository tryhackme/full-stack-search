import type { ChangeEvent } from "react";

export function SearchBar({
  value,
  onSearch,
  showClearBtn,
  onClear,
}: {
  value: string;
  onSearch: (value: string) => void;
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
        value={value}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onSearch(event.target.value)
        }
      />
      {showClearBtn && (
        <span className="left-pan" onClick={onClear}>
          <i className="fa fa-close"></i>
        </span>
      )}
    </div>
  );
}
