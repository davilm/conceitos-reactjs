import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
	api.get('repositories').then(response => setRepositories(response.data))
	.catch(error => console.log(error));
	;
    
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
		title: `Novo projeto`,
	});
	
	setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
	const projectIndex = repositories.findIndex(p => p.id === id);

	if (projectIndex < 0) {
		return;
	}

	const newArray = [...repositories];

	newArray.splice(projectIndex, 1);

	setRepositories(newArray);
	
	await api.delete(`repositories/${id}`);
  }

  return (
    <div>
      	<ul data-testid="repository-list">
				{repositories.map(project => (
				
					<li key={project.id}>
					{project.title}

				<button onClick={() => handleRemoveRepository(project.id)}>
					Remover
				</button>
			</li>
		))}
          
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
