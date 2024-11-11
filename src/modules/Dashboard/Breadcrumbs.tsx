import Link from '@docusaurus/Link';
import Icon from '@site/static/img/home-icon.svg';

export function Breadcrumbs() {
  return (
    <nav aria-label="breadcrumbs" className="mb-[0.8rem]">
      <ul className="breadcrumbs">
        <li className="breadcrumbs__item">
          <Link to="/" className="breadcrumbs__link" href="/">
            <Icon className="align-top relative size-[1.1rem] top-[1px]" />
          </Link>
        </li>
        <li className="breadcrumbs__item breadcrumbs__item--active">
          <span className="breadcrumbs__link">Dashboard</span>
        </li>
      </ul>
    </nav>
  );
}
