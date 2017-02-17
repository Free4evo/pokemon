"use strict"

let data =
{
	next: "https://pokeapi.co/api/v2/pokemon",
	pokemons: [],
	loading: false,
	details:
	{
		loading: false,
		open: false,
		name: "",
		id: 0,
		weight: 0,
		height: 0,
		base_experience: 0,
		order: 0,
	},
}

let methods =
{
	loadMore()
	{
		this.loading = true

		fetch(this.next).then(r => r.json()).then(r =>
		{
			this.next = r.next
			this.pokemons.push(...r.results)
			this.loading = false
		})
	},
	loadDetails(url)
	{
		let { details } = this
		if (details.loading) return

		details.loading = true
		details.open = false

		fetch(url).then(r => r.json()).then(r =>
		{
			Object.assign(details, r,
			{
				open: true,
				loading: false,
			})

			scrollTo({ top: 0, behavior: "smooth" })
		})
	},
	removePokemon(index)
	{
		this.pokemons.splice(index, 1)
	},
}

let isVisible = entry => entry.intersectionRatio == 1
let app = new Vue
({
	el: "#app",
	data,
	methods,
	mounted()
	{
		new IntersectionObserver(entries =>
		{
			if (isVisible) this.loadMore()
		})
		.observe(this.$refs.loadButton)
	},
})


