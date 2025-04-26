import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Profile({ clientId }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/clients/${clientId}`);
        setProfile(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [clientId]);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!profile) return <p>No profile data found.</p>;

  return (
    <div className="card mt-4">
      <div className="card-header">
        <h3>Welcome, {profile.name}</h3>
      </div>
      <div className="card-body">
        <p><strong>Age:</strong> {profile.age}</p>
        <p><strong>Contact:</strong> {profile.contact}</p>
        
        {profile.programs && profile.programs.length > 0 ? (
          <div className="mt-4">
            <h5>Enrolled Programs:</h5>
            <ul className="list-group list-group-flush">
              {profile.programs.map((program) => (
                <li key={program.id} className="list-group-item">
                  {program.name}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="mt-4">No enrolled programs.</p>
        )}
      </div>
    </div>
  );
}
