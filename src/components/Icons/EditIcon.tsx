import React from 'react';
import {SvgXml} from 'react-native-svg';

const xml = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
<path d="M3.33337 17.5H16.6667M4.72171 10.9891C4.36623 11.3452 4.16661 11.8277 4.16671 12.3308V15H6.85254C7.35587 15 7.83837 14.8 8.19421 14.4433L16.1109 6.52247C16.4665 6.16652 16.6662 5.68396 16.6662 5.18081C16.6662 4.67766 16.4665 4.19509 16.1109 3.83914L15.3292 3.05581C15.1529 2.87943 14.9436 2.73954 14.7132 2.64411C14.4828 2.54869 14.2359 2.49962 13.9865 2.49969C13.7372 2.49977 13.4903 2.549 13.2599 2.64457C13.0296 2.74013 12.8204 2.88016 12.6442 3.05664L4.72171 10.9891Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
export const EditIcon = () => {
  return <SvgXml xml={xml} width="20" height="20" />;
};
