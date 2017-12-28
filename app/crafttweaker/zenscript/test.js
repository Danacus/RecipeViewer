// @flow

var IItemStack = crafttweaker.item.IItemStack;
var rh = mods.jei.JEI.removeAndHide;
var removeAndHide = mods.jei.JEI.removeAndHide;

	console.log("--- loading ActuallyAdditions.zs ---");

	
	var rubyblock = new CTItemStack("biomesoplenty:gem_block:1");
	var tanzaniteblock = new CTItemStack("biomesoplenty:gem_block:4");
	var malachiteblock = new CTItemStack("biomesoplenty:gem_block:5");
	var topazblock = new CTItemStack("biomesoplenty:gem_block:3");
	var peridotblock = new CTItemStack("biomesoplenty:gem_block:2");
	var sapphireblock = new CTItemStack("biomesoplenty:gem_block:6");
	var amberblock = new CTItemStack("biomesoplenty:gem_block:7");
	

	recipes.remove(new CTItemStack("actuallyadditions:block_misc:4"));
	recipes.addShapedMirrored("Wood Casing", 
	new CTItemStack("actuallyadditions:block_misc:4", 2), 
	[[new CTItemStack("ore:plankTreatedWood"), new CTItemStack("forestry:oak_stick"), new CTItemStack("ore:plankTreatedWood")],
	[new CTItemStack("forestry:oak_stick"), new CTItemStack("minecraft:log"), new CTItemStack("forestry:oak_stick")], 
	[new CTItemStack("ore:plankTreatedWood"), new CTItemStack("forestry:oak_stick"), new CTItemStack("ore:plankTreatedWood")]]);


	recipes.remove(new CTItemStack("actuallyadditions:block_giant_chest"));
	recipes.addShapedMirrored("Small Storage Crate", 
	new CTItemStack("actuallyadditions:block_giant_chest"), 
	[[new CTItemStack("ore:chest"), new CTItemStack("ore:plankTreatedWood"), new CTItemStack("ore:chest")],
	[new CTItemStack("ore:plankTreatedWood"), new CTItemStack("actuallyadditions:block_misc:4"), new CTItemStack("ore:plankTreatedWood")], 
	[new CTItemStack("ore:chest"), new CTItemStack("ore:plankTreatedWood"), new CTItemStack("ore:chest")]]);

	rh(new CTItemStack("actuallyadditions:block_misc:5"));

	rh(new CTItemStack("actuallyadditions:item_crafter_on_a_stick"));

	recipes.remove(new CTItemStack("actuallyadditions:item_dust:3"));
	
	recipes.remove(new CTItemStack("actuallyadditions:item_dust:7"));
	
	recipes.remove(new CTItemStack("actuallyadditions:block_misc:9"));
	recipes.addShapedMirrored("Iron Casing", 
	new CTItemStack("actuallyadditions:block_misc:9", 2), 
	[[new CTItemStack("ore:blockSheetmetalIron"), new CTItemStack("forestry:thermionic_tubes:1"), new CTItemStack("ore:blockSheetmetalIron")],
	[new CTItemStack("forestry:thermionic_tubes:1"), new CTItemStack("forestry:hardened_machine"), new CTItemStack("forestry:thermionic_tubes:1")], 
	[new CTItemStack("ore:blockSheetmetalIron"), new CTItemStack("forestry:thermionic_tubes:1"), new CTItemStack("ore:blockSheetmetalIron")]]);

	recipes.remove(new CTItemStack("actuallyadditions:item_misc:7"));
	recipes.addShapedMirrored("Basic Coil", 
	new CTItemStack("actuallyadditions:item_misc:7"), 
	[[new CTItemStack("actuallyadditions:item_crystal:5"), new CTItemStack("ore:wireAluminum"), new CTItemStack("forestry:oak_stick")],
	[new CTItemStack("ore:wireAluminum"), new CTItemStack("forestry:oak_stick"), new CTItemStack("ore:wireAluminum")], 
	[new CTItemStack("forestry:oak_stick"), new CTItemStack("ore:wireAluminum"), new CTItemStack("actuallyadditions:item_crystal:5")]]);

	recipes.remove(new CTItemStack("actuallyadditions:item_misc:8"));
	recipes.addShapedMirrored("Advanced Coil", 
	new CTItemStack("actuallyadditions:item_misc:8"), 
	[[null, new CTItemStack("ic2:cable:2").withTag({type: 2, insulation: 0}), new CTItemStack("forestry:oak_stick")],
	[new CTItemStack("ic2:cable:2").withTag({type: 2, insulation: 0}), new CTItemStack("actuallyadditions:item_misc:7"), new CTItemStack("ic2:cable:2").withTag({type: 2, insulation: 0})], 
	[new CTItemStack("forestry:oak_stick"), new CTItemStack("ic2:cable:2").withTag({type: 2, insulation: 0}), null]]);

	recipes.remove(new CTItemStack("actuallyadditions:block_atomic_reconstructor"));
	recipes.addShaped("Atomic Reconstructor", 
	new CTItemStack("actuallyadditions:block_atomic_reconstructor"), 
	[[new CTItemStack("ore:plateSteel"), new CTItemStack("forestry:thermionic_tubes:4"), new CTItemStack("ore:plateSteel")],
	[new CTItemStack("ore:dustRedstone"), new CTItemStack("actuallyadditions:block_misc:9"), new CTItemStack("industrialforegoing:laser_lens_inverted:14")], 
	[new CTItemStack("ore:plateSteel"), new CTItemStack("forestry:thermionic_tubes:4"), new CTItemStack("ore:plateSteel")]]);

	
	
	
	mods.actuallyadditions.Empowerer.removeRecipe(new CTItemStack("actuallyadditions:item_crystal_empowered"));
	mods.actuallyadditions.Empowerer.removeRecipe(new CTItemStack("actuallyadditions:block_crystal_empowered"));
	
	mods.actuallyadditions.Empowerer.addRecipe(new CTItemStack("actuallyadditions:item_crystal_empowered"), new CTItemStack("actuallyadditions:item_crystal"), new CTItemStack("nuclearcraft:gem"), new CTItemStack("thermalfoundation:material:513"), new CTItemStack("tconstruct:tool_rod").withTag({Material: "ardite"}), new CTItemStack("minecraft:red_nether_brick"), 25000, 100, [1.0, 0.0, 0.0]);
	mods.actuallyadditions.Empowerer.addRecipe(new CTItemStack("actuallyadditions:block_crystal_empowered"), new CTItemStack("actuallyadditions:block_crystal"), new CTItemStack("nuclearcraft:gem"), new CTItemStack("thermalfoundation:material:513"), new CTItemStack("tconstruct:tool_rod").withTag({Material: "ardite"}), new CTItemStack("minecraft:red_nether_brick"), 250000, 200, [1.0, 0.0, 0.0]);

	mods.actuallyadditions.Empowerer.removeRecipe(new CTItemStack("actuallyadditions:item_crystal_empowered:1"));
	mods.actuallyadditions.Empowerer.removeRecipe(new CTItemStack("actuallyadditions:block_crystal_empowered:1"));

	mods.actuallyadditions.Empowerer.addRecipe(new CTItemStack("actuallyadditions:item_crystal_empowered:1"), new CTItemStack("actuallyadditions:item_crystal:1"), new CTItemStack("tconstruct:ingots"), new CTItemStack("ic2:plate:13"), new CTItemStack("biomesoplenty:gem:6"), new CTItemStack("tconstruct:slime_congealed:1"), 25000, 100, [0.0, 0.0, 1.0]);
	mods.actuallyadditions.Empowerer.addRecipe(new CTItemStack("actuallyadditions:block_crystal_empowered:1"), new CTItemStack("actuallyadditions:block_crystal:1"), new CTItemStack("tconstruct:ingots"), new CTItemStack("ic2:plate:13"), new CTItemStack("biomesoplenty:gem:6"), new CTItemStack("tconstruct:slime_congealed:1"), 250000, 200, [0.0, 0.0, 1.0]);

	mods.actuallyadditions.Empowerer.removeRecipe(new CTItemStack("actuallyadditions:item_crystal_empowered:2"));
	mods.actuallyadditions.Empowerer.removeRecipe(new CTItemStack("actuallyadditions:block_crystal_empowered:2"));
	
	mods.actuallyadditions.Empowerer.addRecipe(new CTItemStack("actuallyadditions:item_crystal_empowered:2"), new CTItemStack("actuallyadditions:item_crystal:2"), new CTItemStack("nuclearcraft:dust:10"), new CTItemStack("botania:manaresource:2"), new CTItemStack("tconstruct:ingots:2"), new CTItemStack("biomesoplenty:gem:5"), 50000, 200, [0.0, 1.0, 1.0]);
	mods.actuallyadditions.Empowerer.addRecipe(new CTItemStack("actuallyadditions:block_crystal_empowered:2"), new CTItemStack("actuallyadditions:block_crystal:2"), new CTItemStack("nuclearcraft:dust:10"), new CTItemStack("botania:manaresource:2"), new CTItemStack("tconstruct:ingots:2"), new CTItemStack("biomesoplenty:gem:5"), 500000, 4000, [0.0, 1.0, 1.0]);

	mods.actuallyadditions.Empowerer.removeRecipe(new CTItemStack("actuallyadditions:item_crystal_empowered:3"));
	mods.actuallyadditions.Empowerer.removeRecipe(new CTItemStack("actuallyadditions:block_crystal_empowered:3"));

	mods.actuallyadditions.Empowerer.addRecipe(new CTItemStack("actuallyadditions:item_crystal_empowered:3"), new CTItemStack("actuallyadditions:item_crystal:3"), new CTItemStack("minecraft:dye"), new CTItemStack("extendedcrafting:storage"), new CTItemStack("chisel:basalt"), new CTItemStack("actuallyadditions:block_misc:2"), 250000, 100, [0.0, 0.0, 0.0]);
	mods.actuallyadditions.Empowerer.addRecipe(new CTItemStack("actuallyadditions:block_crystal_empowered:3"), new CTItemStack("actuallyadditions:block_crystal:3"), new CTItemStack("minecraft:dye"), new CTItemStack("extendedcrafting:storage"), new CTItemStack("chisel:basalt"), new CTItemStack("actuallyadditions:block_misc:2"), 2500000, 200, [0.0, 0.0, 0.0]);

	mods.actuallyadditions.Empowerer.removeRecipe(new CTItemStack("actuallyadditions:item_crystal_empowered:4"));
	mods.actuallyadditions.Empowerer.removeRecipe(new CTItemStack("actuallyadditions:block_crystal_empowered:4"));

	mods.actuallyadditions.Empowerer.addRecipe(new CTItemStack("actuallyadditions:item_crystal_empowered:4"), new CTItemStack("actuallyadditions:item_crystal:4"), new CTItemStack("minecraft:dye:2"), new CTItemStack("minecraft:emerald"), new CTItemStack("nuclearcraft:dust:9"), new CTItemStack("actuallyadditions:block_testifi_bucks_green_wall"), 50000, 200, [0.0, 1.0, 0.498039]);
	mods.actuallyadditions.Empowerer.addRecipe(new CTItemStack("actuallyadditions:block_crystal_empowered:4"), new CTItemStack("actuallyadditions:block_crystal:4"), new CTItemStack("minecraft:dye:2"), new CTItemStack("minecraft:emerald"), new CTItemStack("nuclearcraft:dust:9"), new CTItemStack("actuallyadditions:block_testifi_bucks_green_wall"), 500000, 400, [0.0, 1.0, 0.498039]);

	mods.actuallyadditions.Empowerer.removeRecipe(new CTItemStack("actuallyadditions:item_crystal_empowered:5"));
	mods.actuallyadditions.Empowerer.removeRecipe(new CTItemStack("actuallyadditions:block_crystal_empowered:5"));

	mods.actuallyadditions.Empowerer.addRecipe(new CTItemStack("actuallyadditions:item_crystal_empowered:5"), new CTItemStack("actuallyadditions:item_crystal:5"), new CTItemStack("minecraft:quartz_block"), new CTItemStack("minecraft:bone_block"), new CTItemStack("mekanism:ingot:1"), new CTItemStack("nuclearcraft:gem:2"), 25000, 100, [1.0, 1.0, 1.0]);
	mods.actuallyadditions.Empowerer.addRecipe(new CTItemStack("actuallyadditions:block_crystal_empowered:5"), new CTItemStack("actuallyadditions:block_crystal:5"), new CTItemStack("minecraft:quartz_block"), new CTItemStack("minecraft:bone_block"), new CTItemStack("mekanism:ingot:1"), new CTItemStack("nuclearcraft:gem:2"), 250000, 200, [1.0, 1.0, 1.0]);


			
		mods.actuallyadditions.Crusher.addRecipe(new CTItemStack("minecraft:dye:9", 2), rubyblock, new CTItemStack("minecraft:dye:9", 2), 50);
	mods.actuallyadditions.Crusher.addRecipe(new CTItemStack("minecraft:dye:10", 2), malachiteblock, new CTItemStack("minecraft:dye:10", 2), 50);
	mods.actuallyadditions.Crusher.addRecipe(new CTItemStack("minecraft:dye:14", 2), topazblock, new CTItemStack("minecraft:dye:14", 2), 50);
	mods.actuallyadditions.Crusher.addRecipe(new CTItemStack("minecraft:dye:2", 2), peridotblock, new CTItemStack("minecraft:dye:2", 2), 50);
	mods.actuallyadditions.Crusher.addRecipe(new CTItemStack("minecraft:dye:12", 2), sapphireblock, new CTItemStack("minecraft:dye:6", 2), 50);
	
		mods.actuallyadditions.Crusher.addRecipe(new CTItemStack("appliedenergistics2:material:1", 2), new CTItemStack("appliedenergistics2:charged_quartz_ore"));
	mods.actuallyadditions.Crusher.addRecipe(new CTItemStack("appliedenergistics2:material:2"), new CTItemStack("appliedenergistics2:material:1"));
	mods.actuallyadditions.Crusher.addRecipe(new CTItemStack("appliedenergistics2:material:2"), new CTItemStack("appliedenergistics2:material"));
	

		


	mods.actuallyadditions.BallOfFur.addReturn(new CTItemStack("thermalfoundation:material:160"), 3);
	mods.actuallyadditions.BallOfFur.addReturn(new CTItemStack("astralsorcery:itemusabledust"), 5);
	mods.actuallyadditions.BallOfFur.addReturn(new CTItemStack("extendedcrafting:material"), 1);
	mods.actuallyadditions.BallOfFur.addReturn(new CTItemStack("appliedenergistics2:material:45"), 8);
	mods.actuallyadditions.BallOfFur.addReturn(new CTItemStack("appliedenergistics2:material:3"), 6);
	mods.actuallyadditions.BallOfFur.addReturn(new CTItemStack("biomesoplenty:gem:1"), 6);
	mods.actuallyadditions.BallOfFur.addReturn(new CTItemStack("immersiveengineering:material:9"), 1);
	mods.actuallyadditions.BallOfFur.addReturn(new CTItemStack("immersiveengineering:material:8"), 12);
	mods.actuallyadditions.BallOfFur.addReturn(new CTItemStack("plustic:alumiteingot"), 1);



		
			

			
			

		

	
		var recipesToRemove = [
	new CTItemStack("actuallyadditions:item_dust"),
	new CTItemStack("actuallyadditions:item_dust:1"),
	new CTItemStack("actuallyadditions:item_dust:2"),
	new CTItemStack("actuallyadditions:item_dust:4"),
	new CTItemStack("actuallyadditions:item_dust:5"),
	new CTItemStack("actuallyadditions:item_dust:6")
	];
	
	for (items in recipesToRemove) {
		rh(items);
	}

for (var i = 1; i <= 20; i++) {
    console.log(i);
}

IArray.forEach((item, i) => {
	console.log(i)
});

if (loadedMods.inculdes("mcp")){
    console.log("Minecraft Coder Pack loaded");
}
		console.log("--- ActuallyAdditions.zs initialized ---");