import React from 'react';

const CamperListItem = (props) => {
  return (
    <tr>
      <td>{props.username}</td>
      <td>{props.recent}</td>
      <td>{props.alltime}</td>
    </tr>
  );
};

export default CamperListItem;
