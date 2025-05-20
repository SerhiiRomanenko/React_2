import { useRef } from "react";
import "./style.scss";
import { URL } from "../../../constants/constants";
import axios from "axios";

function Form({
	user,
	correctUser,
	setCorrectUser,
	gameStarted,
	repoInfo,
	userStatus,
}) {
	const inputRef = useRef();

	const totalStargazers = repoInfo
		? repoInfo.reduce((sum, repo) => sum + repo.stargazers_count, 0)
		: 0;

	const totalScore = correctUser ? correctUser.followers + totalStargazers : 0;

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();

			const username = inputRef.current.value.trim();
			if (!username) {
				console.log("Будь ласка, введіть ім'я користувача.");
				return;
			}

			const response = await axios.get(`${URL}/${username}`);
			console.log(response);

			if (response.status === 200) {
				setCorrectUser(response.data);
			} else {
				console.log(
					"Користувач не знайдений або інша помилка статусу:",
					response.status
				);
				setCorrectUser(false);
			}
		} catch (error) {
			console.error("Помилка під час запиту користувача:", error);
			setCorrectUser(false);
		}
	};

	const handleReset = (e) => {
		e.preventDefault();
		setCorrectUser(false);
		if (inputRef.current) {
			inputRef.current.value = "";
		}
	};

	return (
		<div className="form-wrapper">
			{gameStarted && userStatus === "winner" && (
				<h2 className="form__status form__status--winner">Winner 🥳</h2>
			)}
			{gameStarted && userStatus === "loser" && (
				<h2 className="form__status form__status--loser">Loser 🥵</h2>
			)}
			{gameStarted && userStatus === "draw" && (
				<h2 className="form__status form__status--draw">Draw 🤝</h2>
			)}
			<form className="form">
				{correctUser ? (
					<img
						className="form__logo"
						src={correctUser.avatar_url}
						alt="avatar"
					/>
				) : (
					<p className="form__description">
						Choose <b>{user}</b> username:{" "}
					</p>
				)}

				{correctUser ? (
					<p className="form__login">@{correctUser.login}</p>
				) : (
					<input
						className="form__input"
						type="text"
						placeholder={user}
						ref={inputRef}
						disabled={gameStarted}
					/>
				)}

				{gameStarted && correctUser && (
					<>
						<p>👥 Followers: {correctUser.followers}</p>
						<p>🌟 Repositories stars: {totalStargazers}</p>
						<b>🏁 Total score: {totalScore}</b>
					</>
				)}

				{correctUser
					? !gameStarted && (
							<button className="form__reset" onClick={handleReset}>
								Reset
							</button>
					  )
					: !gameStarted && (
							<button className="form__submit" onClick={handleSubmit}>
								Submit
							</button>
					  )}
			</form>
		</div>
	);
}

export default Form;
