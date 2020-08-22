import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
	const [repositories, setRepositories] = useState([]);

	useEffect(() => {
		api.get("repositories").then((response) => setRepositories(response.data));
	}, []);

	async function handleAddRepository() {
		const response = await api.post("repositories", {
			title: "gostack-desafio2",
			url: "https://github.com/mauriciosoares01/gostack-desafio2",
			techs: ["Node.js", "express"],
		});

		setRepositories([...repositories, response.data]);
	}

	async function handleRemoveRepository(id) {
		await api.delete(`repositories/${id}`);

		const index = repositories.findIndex((repository) => repository.id !== id);

		let temp = repositories;
		temp.splice(index, 1);
		setRepositories([...temp]);
	}

	return (
		<div>
			<ul data-testid="repository-list">
				{repositories.map((repositorie) => (
					<li key={repositorie.id}>
						{repositorie.title}
						<button onClick={() => handleRemoveRepository(repositorie.id)}>
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
