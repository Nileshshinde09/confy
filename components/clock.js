import React  from 'react';
import Clock from 'react-live-clock';

  
export default function headerclock() {
  return (
    <div>
      <Clock format={'h:mm:ssa'} ticking={true} />
    </div>
  );
}