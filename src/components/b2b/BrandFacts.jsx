import { confirmedLegalEntity, parentBrandLink } from '../../config/business';

export function LegalEntityName({ className = '' }) {
  const name = confirmedLegalEntity();
  if (!name) return null;
  return <span className={className}>{name}</span>;
}

export function ParentBrandLine({ className = '' }) {
  const parent = parentBrandLink();
  if (!parent) return null;
  return (
    <a href={parent.href} className={className} rel="noopener noreferrer">
      {parent.label}
    </a>
  );
}
