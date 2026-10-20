import {garage} from '@/lib/garage';

export function MapEmbed({title}: {title: string}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line">
      <iframe
        title={title}
        src={garage.mapsEmbed}
        className="h-64 w-full grayscale contrast-125"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
