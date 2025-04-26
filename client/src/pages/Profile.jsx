import React, { useEffect, useState } from "react";
import { fetchProfile } from "../api";

export default function Profile({ clientId }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchProfile(clientId, token)
      .then(data => setProfile(data))
      .catch(err => console.error(err));
  }, [clientId]);

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-2">Welcome, {profile.name}</h1>
      <p>Age: {profile.age}</p>
      <p>Contact: {profile.contact}</p>
      <div className="mt-4">
        <h2 className="font-semibold">Enrolled Programs:</h2>
        <ul className="list-disc pl-5">
          {profile.programs.map(p => <li key={p.id}>{p.name}</li>)}
        </ul>
      </div>
    </div>
  );
}
