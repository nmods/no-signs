module.exports=function nosigns(mod){
    let signs = {}
	let signsSpawned = true

	command.add('signs', () => {
		if (signsSpawned) {
			despawnSigns()
			command.message('signs despawned')
		} else {
			spawnSigns()
			command.message('signs respawned')
		}
		signsSpawned = !signsSpawned
	})

	function spawnSigns() {
		for (let key in signs) {
			mod.send('S_SPAWN_BUILD_OBJECT', 2, signs[key])
		}
	}
	function despawnSigns() {
		for (let key in signs) {
			mod.send('S_DESPAWN_BUILD_OBJECT', 2, { gameId: key })
		}
	}

	mod.hook('S_SPAWN_BUILD_OBJECT', 2, event => {
		signs[event.gameId] = event
		if (!signsSpawned) return false
	})
	mod.hook('S_DESPAWN_BUILD_OBJECT', 2, event => {
		delete signs[event.gameId]
	})
}