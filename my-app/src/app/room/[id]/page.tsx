import React from "react";

interface RoomPageProps {
  params: {
    id: string;
  };
}

function Room({ params }: RoomPageProps) {
  return (
    <div>
      <h1>Room id : {params.id}</h1>
    </div>
  );
}

export default Room;
