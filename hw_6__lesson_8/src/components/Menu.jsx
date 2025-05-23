export default function Menu() {
	return (
		<nav className="menu">
			<ul className="menu__list">
				<li className="menu__item">
					<a className="menu__itemLink" href="/">
						Home
					</a>
				</li>
				<li className="menu__item">
					<a className="menu__itemLink" href="/countries">
						Countries
					</a>
				</li>
			</ul>
		</nav>
	);
}
