import { ChangeEvent } from "react";

interface SearchFormProps {
  searchValue: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  showClearBtn: boolean;
  loading: boolean;
  error: string | null;
}

const SearchForm: React.FC<SearchFormProps> = ({
  searchValue,
  onChange,
  onClear,
  showClearBtn,
  loading,
  error,
}) => (
  <div className="dropdown">
    <div className="form">
      <i className="fa fa-search"></i>
      <input
        type="text"
        className="form-control form-input"
        placeholder="Search accommodation..."
        onChange={onChange}
        value={searchValue}
      />
      {showClearBtn && (
        <span className="left-pan" onClick={onClear} role="button">
          <i className="fa fa-close"></i>
        </span>
      )}
    </div>

    {loading && <div className="loading-spinner">Loading...</div>}
    {error && <p className="error">{error}</p>}
  </div>
);

export default SearchForm;
