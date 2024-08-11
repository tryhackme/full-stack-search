export interface ItemResultProps {
  label: string;
  link: string;
}

export function ItemResult({ label, link }: ItemResultProps) {
  return (
    <li>
      <a href={link} className="dropdown-item">
        <i className="fa fa-building mr-2"></i>
        {label}
      </a>
      <hr className="divider" />
    </li>
  );
}
