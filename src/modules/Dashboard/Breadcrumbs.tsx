import Link from '@docusaurus/Link';
import Icon from '@site/static/img/home-icon.svg';

export function Breadcrumbs({ title = '' }) {
  return (
    <nav aria-label="breadcrumbs" className="mb-[0.8rem]">
      <ul className="breadcrumbs">
        <li className="breadcrumbs__item">
          <Link to="/" className="breadcrumbs__link" href="/">
            <Icon className="relative top-[1px] size-[1.1rem] align-top" />
          </Link>
        </li>
        <li className="breadcrumbs__item breadcrumbs__item--active">
          <span className="breadcrumbs__link">{title}</span>
        </li>
      </ul>
    </nav>
  );
}
