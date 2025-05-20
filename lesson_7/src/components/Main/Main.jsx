import React, { useEffect, useState, useCallback } from "react";

import Form from "./Form/Form";
import "./style.scss";
import axios from "axios";
import { URL } from "../../constants/constants";

function Main() {
	const [user1, setUser1] = useState("Player 1");
	const [user2, setUser2] = useState("Player 2");

	const [correctUser1, setCorrectUser1] = useState(false);
	const [correctUser2, setCorrectUser2] = useState(false);

	const [repoInfoUser1, setRepoInfoUser1] = useState(null);
	const [repoInfoUser2, setRepoInfoUser2] = useState(null);

	const [areBothCorrect, setAreBothCorrect] = useState(false);
	const [gameStarted, setGameStarted] = useState(false);

	const [user1Status, setUser1Status] = useState(null);
	const [user2Status, setUser2Status] = useState(null);

	const handlePlayGame = async () => {
		setGameStarted(true);

		setUser1Status(null);
		setUser2Status(null);

		let fetchedRepos1 = null;
		let fetchedRepos2 = null;

		try {
			if (correctUser1 && correctUser1.login) {
				const responseUser1 = await axios.get(
					`${URL}/${correctUser1.login}/repos?per_page=100`
				);
				fetchedRepos1 = responseUser1.data;
				setRepoInfoUser1(fetchedRepos1);
			} else {
				console.error("Користувач 1 недійсний для запиту репозиторіїв.");
				setRepoInfoUser1(null);
			}

			if (correctUser2 && correctUser2.login) {
				const responseUser2 = await axios.get(
					`${URL}/${correctUser2.login}/repos?per_page=100`
				);
				fetchedRepos2 = responseUser2.data;
				setRepoInfoUser2(fetchedRepos2);
			} else {
				console.error("Користувач 2 недійсний для запиту репозиторіїв.");
				setRepoInfoUser2(null);
			}

			if (fetchedRepos1 && fetchedRepos2) {
				const totalStarsUser1 = fetchedRepos1.reduce(
					(sum, repo) => sum + repo.stargazers_count,
					0
				);
				const totalStarsUser2 = fetchedRepos2.reduce(
					(sum, repo) => sum + repo.stargazers_count,
					0
				);

				if (totalStarsUser1 > totalStarsUser2) {
					setUser1Status("winner");
					setUser2Status("loser");
				} else if (totalStarsUser2 > totalStarsUser1) {
					setUser1Status("loser");
					setUser2Status("winner");
				} else {
					setUser1Status("draw");
					setUser2Status("draw");
				}
			} else {
				setGameStarted(false);
				setUser1Status(null);
				setUser2Status(null);
			}
		} catch (error) {
			console.error("Помилка під час отримання репозиторіїв:", error);
			setGameStarted(false);
			setUser1Status(null);
			setUser2Status(null);
		}
	};

	const handleResetGame = () => {
		setCorrectUser1(false);
		setCorrectUser2(false);
		setRepoInfoUser1(null);
		setRepoInfoUser2(null);
		setAreBothCorrect(false);
		setGameStarted(false);
		setUser1Status(null);
		setUser2Status(null);
	};

	useEffect(() => {
		if (correctUser1 && correctUser2) {
			setAreBothCorrect(true);
		} else {
			setAreBothCorrect(false);

			setGameStarted(false);
			setUser1Status(null);
			setUser2Status(null);
			setRepoInfoUser1(null);
			setRepoInfoUser2(null);
		}
	}, [correctUser1, correctUser2]);

	return (
		<main className="main">
			<div className="main__container container">
				<Form
					user={user1}
					correctUser={correctUser1}
					setCorrectUser={setCorrectUser1}
					areBothCorrect={areBothCorrect}
					gameStarted={gameStarted}
					repoInfo={repoInfoUser1}
					userStatus={user1Status}
				/>
				<Form
					user={user2}
					correctUser={correctUser2}
					setCorrectUser={setCorrectUser2}
					areBothCorrect={areBothCorrect}
					gameStarted={gameStarted}
					repoInfo={repoInfoUser2}
					userStatus={user2Status}
				/>
				{areBothCorrect && !gameStarted && (
					<button className="battle" onClick={handlePlayGame}>
						Battle!
					</button>
				)}
				{gameStarted && (
					<button className="restart" onClick={handleResetGame}>
						Restart 🔄
					</button>
				)}
			</div>
		</main>
	);
}

export default Main;
