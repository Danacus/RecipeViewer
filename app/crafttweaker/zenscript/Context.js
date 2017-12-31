// @flow

import Stack from '../../api/Stack';
import { store } from '../../App';

const add = (inputs: CTS[] | CTS, outputs: CTS[] | CTS, catalysts: CTS[] | CTS, name: string) => 
  store.getCurrentProfile().recipes.addRecipe(
    flatten([inputs]), 
    flatten([outputs]),
    flatten([catalysts]),
    name
  );

const remove = (inputs: ?CTS[] | ?CTS, outputs: CTS[] | CTS, catalysts: CTS[] | CTS, wildcard: boolean = false) => 
  store.getCurrentProfile().recipes.removeRecipe(
    flatten([inputs]), 
    flatten([outputs]),
    flatten([catalysts]),
    wildcard
  );

const removeAll = (catalysts: CTS[] | CTS) => 
  store.getCurrentProfile().recipes.removeAllRecipes(
    flatten([catalysts])
  );

const removeByName = (name: string) => 
  store.getCurrentProfile().recipes.removeRecipesByName(
    name
  );

const removeByRegex = (regex: RegExp) => 
  store.getCurrentProfile().recipes.removeRecipesByRegex(
    regex
  );


const flatten = list => list.reduce(
  (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
);

// CraftTweakerStack
export class CTS extends Stack {
  constructor(item: string[], amount: number = 1) {
    super(item, amount);
  }

  add = () => this // TODO: Oredict support
  addItems = () => this
  remove = () => this
  removeItems = () => this
  mirror = () => this
  empty = () => false
  name =  ''
  displayName = ''
  maxStackSize = -1
  hardness = -1
  damage = -1
  maxDamage = -1
  ores = []
  owner = ''
  asBlock = () => this

  definition = {
    name: '',
    displayname: '',
    amount: '',
    luminosity: '',
    density: '',
    temperature: '',
    viscosity: '',
    gaseous: '',
    tag: '',
    id: '',
    ores: []
  }

  getStack = () => new Stack(this.names, this.amount)

  includes = (oredict: string) => true
  addTooltip = () => this
  withTag = () => this
  withEmptyTag = () => this
  removeTag = () => this
  updateTag = () => this
  withDisplayName = () => this
  withLore = () => this
  anyDamage = () => this
  withDamage = () => this
  anyAmount = () => this
}

const crafting_table = new CTS(['minecraft:crafting_table:0']);
const addVanilla = (name, outputs, inputs) => add(inputs, outputs, crafting_table, name);


export const context = {
  recipes: {
    remove: output => remove(undefined, output, crafting_table),
    removeAll: () => removeAll(crafting_table),
    removeShaped: (output, inputs) => remove(inputs, output, crafting_table),
    removeShapeless: (output, inputs) => remove(inputs, output, crafting_table),
    removeByRecipeName: name => removeByName(name),
    removeByRegex: regex => removeByRegex(new RegExp(regex)),
    addShaped: addVanilla,
    addShapeless: addVanilla,
    addShapedMirrored: addVanilla,
  },
  furnace: {
    remove: stack => console.log("remove recipe"),
    removeAll: stack => {},
    addRecipe: stack => console.log("add recipe"),
    setFuel: () => {},
  },
  CTS,
  oreDict: {
    contains: (oredict: string) => true,
    includes: (oredict: string) => true
  },
  totalActions: () => 0,
  enableDebug: () => {},
  isNull: (obj: any) => obj == null,
  max: Math.max,
  min: Math.min,
  pow: Math.pow,
  format: {
    black: () => {},
    darkBlue: () => {},
    darkGreen: () => {},
    darkAqua: () => {},
    darkRed: () => {},
    darkPurple: () => {},
    gold: () => {},
    gray: () => {},
    darkGray: () => {},
    blue: () => {},
    green: () => {},
    aqua: () => {},
    red: () => {},
    lightPurple: () => {},
    yellow: () => {},
    white: () => {},
  },
  print: (message: string) => console.log(message),
  mods: {
    jei: {
      JEI: {
        hide: () => {},
        removeAndHide: () => {},
        addItem: () => {},
        addDescription: () => {}
      },
    }, 
    abyssalcraft: {
      CreationRitual: {
        addRitual: () => {},
        removeRitual: () => {}
      },
      Crystallizer: {
        addCrystallization: () => {},
        addSingleCrystallization: () => {},
        removeCrystallization: () => {}
      },
      EnchantmentRitual: {
        addRitual: () => {},
        removeRitual: () => {}
      },
      InfusionRitual: {
        addRitual: () => {},
        removeRitual: () => {}
      },
      necronomicon: {
        internal: {
          addChapter: () => {},
          removeChapter: () => {},
          addNormalPage: () => {},
          addItemPage: () => {},
          addImagePage: () => {},
          addCraftingPage: () => {},
          addURLPage: () => {},
          removePage: () => {}
        }
      },
      PotionAoERitual: {
        addRitual: () => {},
        removeRitual: () => {}
      },
      PotionRitual: {
        addRitual: () => {},
        removeRitual: () => {}
      },
      shoggoth: {
        addShoggothFood: () => {}
      },
      Transmutator: {
        addTransmutation: () => {},
        removeTransmutation: () => {}
      },
      UpgradeKit: {
        addUpgrade: () => {},
        removeUpgrade: () => {}
      }
    },
    armoreablemobs: {
      ArmorGroup: class {
        addEntity() {return this}
        addArmor() {return this}
        addGameStage() {return this}
      },
      ArmorHandler: {
        createArmorGroup: () => new context.mods.armoreablemobs.ArmorGroup(),
        createArmorEntity: () => new context.mods.armoreablemobs.ArmorEntity(),
        createArmorSlot: () => new context.mods.armoreablemobs.ArmorSlot()
      },
      ArmorEntity: class {
        withNBTCheck() {return this}
      },
      ArmorSlot: class {

      }
    },
    astralsorcery: {
      Altar: {
        removeAltarRecipe: () => {},
        addDiscoveryAltarRecipe: () => {},
        addAttunmentAltarRecipe: () => {},
        addConstellationAltarRecipe: () => {}
      },
      StarlightInfusion: {
        addInfusion: () => {},
        removeInfusion: () => {}
      },
      LightTransmutation: {
        addTransmutation: () => {},
        removeTransmutation: () => {}
      },
      RitualMineralis: {
        addOre: () => {},
        removeOre: () => {}
      },
      Lightwell: {
        removeLiquefaction: () => {},
        addLiquefaction: () => {}
      }
    },
    BadMobs: {
      blacklist: () => {}
    },
    caravans: {
      Entity: {
        setEntityClassPath: () => {},
        setCustomInfo: () => {}
      }
    },
    contenttweaker: {
      Item: {
        setUnlocalizedName: () => {},
        setMaxStackSize: () => {},
        setRarity: () => {},
        setCreativeTab: () => {},
        setSmeltingExperience: () => {},
        setToolClass: () => {},
        setToolLevel: () => {},
        setBeaconPayment: () => {},
        setItemRightClick: () => {},
        setItemUseAction: () => {},
        setGlowing: () => {},
        setOnItemUse: () => {},
        setMaxDamage: () => {},
        register: () => {}
      },
      Block: {
        setUnlocalizedName: () => {},
        setCreativeTab: () => {},
        setFullBlock: () => {},
        setLightOpacity: () => {},
        setTranslucent: () => {},
        setLightValue: () => {},
        setBlockHardness: () => {},
        setBlockResistance: () => {},
        setToolClass: () => {},
        setToolLevel: () => {},
        setBlockSoundType: () => {},
        setBlockMaterial: () => {},
        setEnchantPowerBonus: () => {},
        setEnumBlockRenderType: () => {},
        setSlipperiness: () => {},
        setOnBlockBreak: () => {},
        setOnBlockPlace: () => {},
        setBlockLayer: () => {},
        setAxisAlignedBB: () => {},
        setOnUpdateTick: () => {},
        setOnRandomTick: () => {},
        setMobilityFlag: () => {},
        register: () => {}
      },
      Fluid: {
        setUnlocalizedName: () => {},
        setDensity: () => {},
        setGaseous: () => {},
        setLuminosity: () => {},
        setTemperature: () => {},
        setColor: () => {},
        setColorize: () => {},
        setStillLocation: () => {},
        setFlowingLocation: () => {},
        setRarity: () => {},
        setViscosity: () => {},
        setFillSound: () => {},
        setEmptySound: () => {},
        setVaporize: () => {},
        setMaterial: () => {},
        register: () => {}
      },
      CreativeTab: {
        register: () => {}
      },
      Particles: {
        createParticle: () => {},
        doFireParticles: () => {},
        doEnderChestParticles: () => {}
      },
      Commands: {
        call: () => {}
      },
      PartType: {
        setData: () => {}
      },
      MaterialPart: {
        setTextureLocation: () => {},
        setColorized: () => {}
      },
      MaterialPartData: {
        addDataValue: () => {}
      },
      MutableItemStack: {
        setCount: () => {},
        shrink: () => {},
        grow: () => {},
        damage: () => {}
      },
      AxisAlignedBB: {
        setMinX: () => {},
        setMinY: () => {},
        setMinZ: () => {},
        setMaxX: () => {},
        setMaxY: () => {},
        setMaxZ: () => {}
      }
    },
    crossroads: {
      FluidCoolingChamber: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      Grindstone: {
        addRecipe: () => {},
        removeRecipe: () => {}
      }
    },
    DimensionStages: {
      addDimensionStage: () => {}
    },
    extendedcrafting: {
      CombinationCrafting: {
        addRecipe: () => {},
        remove: () => {}
      },
      CompressionCrafting: {
        addRecipe: () => {},
        remove: () => {}
      },
      TableCrafting: {
        addShaped: () => {},
        addShapeless: () => {},
        remove: () => {}
      }
    },
    gregtech: {
      AlloySmelter: {
        addRecipe: () => {}
      },
      Amplifabricator: {
        addRecipe: () => {}
      },
      ArcFurnace: {
        addRecipe: () => {}
      },
      Assembler: {
        addRecipe: () => {}
      },
      AssemblyLine: {
        addRecipe: () => {}
      },
      Autoclave: {
        addRecipe: () => {}
      },
      BlastFurnace: {
        addRecipe: () => {}
      },
      Brewery: {
        addRecipe: () => {}
      },
      Canner: {
        addRecipe: () => {}
      },
      Centrifuge: {
        addRecipe: () => {},
        addRecipeFuelCan: () => {}
      },
      ChemicalBath: {
        addRecipe: () => {}
      },
      ChemicalReactor: {
        addRecipe: () => {}
      },
      CuttingSaw: {
        addRecipe: () => {}
      },
      DistillationTower: {
        addRecipe: () => {}
      },
      Distillery: {
        addRecipe: () => {}
      },
      Electrolyzer: {
        addRecipe: () => {}
      },
      Extruder: {
        addRecipe: () => {}
      },
      Fermenter: {
        addRecipe: () => {}
      },
      FluidCanner: {
        addRecipe: () => {}
      },
      FluidExtractor: {
        addRecipe: () => {}
      },
      FluidHeater: {
        addRecipe: () => {}
      },
      FluidSolidifier: {
        addRecipe: () => {}
      },
      ForgeHammer: {
        addRecipe: () => {}
      },
      FormingPress: {
        addRecipe: () => {}
      },
      FusionReactor: {
        addRecipe: () => {}
      },
      ImplosionCompressor: {
        addRecipe: () => {}
      },
      Lathe: {
        addRecipe: () => {}
      },
      Mixer: {
        addRecipe: () => {}
      },
      OilCracker: {
        addRecipe: () => {}
      },
      Packer: {
        addRecipe: () => {}
      },
      PlasmaArcFurnace: {
        addRecipe: () => {}
      },
      PlateBender: {
        addRecipe: () => {}
      },
      Polarizer: {
        addRecipe: () => {}
      },
      PrecisionLaser: {
        addRecipe: () => {}
      },
      Printer: {
        addRecipe: () => {}
      },
      Pulverizer: {
        addRecipe: () => {}
      },
      PyrolyseOven: {
        addRecipe: () => {}
      },
      Separator: {
        addRecipe: () => {}
      },
      Sifter: {
        addRecipe: () => {}
      },
      Slicer: {
        addRecipe: () => {}
      },
      Unpacker: {
        addRecipe: () => {}
      },
      VacuumFreezer: {
        addRecipe: () => {}
      },
      Wiremill: {
        addRecipe: () => {}
      },
      Fuels: {
        addDieselFuel: () => {},
        addGasTurbineFuel: () => {},
        addThermalGeneratorFuel: () => {},
        addDenseFluidFuel: () => {},
        addPlasmaGeneratorFuel: () => {},
        addMagicGeneratorFuel: () => {}
      }
    },
    horsepower: {
      ChoppingBlock: {
        add: () => {},
        remove: () => {}
      },
      Grindstone: {
        add: () => {},
        remove: () => {}
      },
      Press: {
        add: () => {},
        remove: () => {}
      }
    },
    immersiveengineering: {
      AlloySmelter: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      ArcFurnace: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      BlastFurnace: {
        addRecipe: () => {},
        removeRecipe: () => {},
        addFuel: () => {},
        removeFuel: () => {}
      },
      Blueprint: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      BottlingMachine: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      CokeOven: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      Crusher: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      DieselHandler: {
        addFuel: () => {},
        addDrillFuel: () => {},
        removeFuel: () => {},
        removeDrillFuel: () => {}
      },
      Excavator: {
        addMineral: () => {},
        removeMineral: () => {},
        addOre: () => {},
        removeOre: () => {}
      },
      Fermenter: {
        addRecipe: () => {},
        removeFluidRecipe: () => {},
        removeItemRecipe: () => {},
        removeByInput: () => {}
      },
      MetalPress: {
        addRecipe: () => {},
        removeRecipe: () => {},
        removeRecipeByMold: () => {}
      },
      Mixer: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      Refinery: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      Squeezer: {
        addRecipe: () => {},
        removeFluidRecipe: () => {},
        removeItemRecipe: () => {},
        removeByInput: () => {}
      }
    },
    industrialforegoing: {
      BioReactor: {
        add: () => {},
        remove: () => {}
      },
      LaserDrill: {
        add: () => {},
        remove: () => {}
      },
      SludgeRefiner: {
        add: () => {},
        remove: () => {}
      }
    },
    initialinventory: {
      InvHandler: {
        addStartingItem: () => {}
      }
    },
    ItemStages: {
      addItemStage: () => {}
    },
    ltt: {
      LootTable: {
        removeTable: () => {},
        removePool: () => {},
        removeEntry: () => {},
        removeItem: () => {},
        removeModEntry: () => {},
        removeModItem: () => {},
        removeModTable: () => {},
        removeGlobalItem: () => {}
      }
    },
    mekanism: {
      chemical: {
        crystallizer: {
          addRecipe: () => {},
          removeRecipe: () => {}
        },
        dissolution: {
          addRecipe: () => {},
          removeRecipe: () => {}
        },
        infuser: {
          addRecipe: () => {},
          removeRecipe: () => {}
        },
        injection: {
          addRecipe: () => {},
          removeRecipe: () => {}
        },
        oxidizer: {
          addRecipe: () => {},
          removeRecipe: () => {}
        },
        washer: {
          addRecipe: () => {},
          removeRecipe: () => {}
        }
      },
      combiner: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      compressor: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      crusher: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      smelter: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      enrichment: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      infuser: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      purification: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      reaction: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      sawmill: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      separator: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      solarneutronactivator: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      thermalevaporation: {
        addRecipe: () => {},
        removeRecipe: () => {}
      }
    },
    MobStages: {
      addStage: () => {},
      addReplacement: () => {},
      addRange: () => {},
      toggleSpawner: () => {}
    },
    actuallyadditions: {
      AtomicReconstructor: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      BallOfFur: {
        addReturn: () => {},
        removeReturn: () => {}
      },
      Compost: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      Crusher: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      Empowerer: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      MiningLens: {
        addStoneOre: () => {},
        addNetherOre: () => {},
        removeStoneOre: () => {},
        removeNetherOre: () => {}
      },
      OilGen: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      TreasureChest: {
        addLoot: () => {},
        removeLoot: () => {}
      }
    },
    betterwithmods: {
      Anvil: {
        addShaped: () => {},
        addShapeless: () => {},
        removeShaped: () => {},
        removeShapeless: () => {}
      },
      Buoyancy: {
        set: () => {}
      },
      Cauldron: {
        add: () => {},
        remove: () => {}
      },
      Crucible: {
        add: () => {},
        remove: () => {}
      },
      Kiln: {
        add: () => {},
        remove: () => {},
        registerBlock: () => {}
      },
      Mill: {
        add: () => {},
        remove: () => {}
      },
      Movement: {
        set: () => {}
      },
      Saw: {
        add: () => {},
        remove: () => {}
      },
      StokedCauldron: {
        add: () => {},
        remove: () => {}
      },
      StokedCrucible: {
        add: () => {},
        remove: () => {}
      },
      Turntable: {
        add: () => {},
        remove: () => {}
      }
    },
    extrautils2: {
      Crusher: {
        add: () => {},
        remove: () => {}
      },
      Resonator: {
        add: () => {},
        remove: () => {}
      }
    },
    forestry: {
      Carpenter: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      Centrifuge: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      Fermenter: {
        addRecipe: () => {},
        removeRecipe: () => {},
        addFuel: () => {},
        removeFuel: () => {}
      },
      Moistener: {
        addRecipe: () => {},
        removeRecipe: () => {},
        addFuel: () => {},
        removeFuel: () => {}
      },
      Squeezer: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      Still: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      ThermionicFabricator: {
        addSmelting: () => {},
        addCast: () => {},
        removeSmelting: () => {},
        removeCast: () => {}
      }
    },
    tconstruct: {
      Alloy: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      Casting: {
        addTableRecipe: () => {},
        addBasinRecipe: () => {},
        removeTableRecipe: () => {},
        removeBasinRecipe: () => {}
      },
      Drying: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      Fuel: {
        registerFuel: () => {}
      },
      Melting: {
        addRecipe: () => {},
        addEntityMelting: () => {},
        removeRecipe: () => {},
        removeEntityMelting: () => {}
      }
    },
    thermalexpansion: {
      Centrifuge: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      Compactor: {
        addMintRecipe: () => {},
        addPressRecipe: () => {},
        addStorageRecipe: () => {},
        removeMintRecipe: () => {},
        removePressRecipe: () => {},
        removeStorageRecipe: () => {}
      },
      Crucible: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      InductionSmelter: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      Infuser: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      Insolator: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      Pulverizer: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      RedstoneFurnace: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      Refinery: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      Sawmill: {
        addRecipe: () => {},
        removeRecipe: () => {}
      },
      Transposer: {
        addExtractRecipe: () => {},
        removeExtractRecipe: () => {},
        addFillRecipe: () => {},
        removeFillRecipe: () => {}
      }
    },
    nuclearcraft: {
      manufactory: {
        addRecipe: () => {},
        removeRecipe: () => {}
      }
    },
    pneumaticcraft: {
      assembly: {
        addDrillRecipe: () => {},
        addLaserRecipe: () => {},
        addDrillLaserRecipe: () => {},
        removeDrillRecipe: () => {},
        removeAllDrillRecipes: () => {},
        removeLaserRecipe: () => {},
        removeAllLaserRecipes: () => {},
        removeDrillLaserRecipe: () => {},
        removeAllDrillLaserRecipes: () => {},
        removeAllRecipes: () => {}
      },
      heatframecooling: {
        addRecipe: () => {},
        removeRecipe: () => {},
        removeAllRecipes: () => {}
      },
      pressurechamber: {
        addRecipe: () => {},
        removeRecipe: () => {},
        removeAllRecipes: () => {}
      },
      refinery: {
        addRecipe: () => {},
        removeRecipes: () => {},
        removeRecipe: () => {},
        removeAllRecipes: () => {}
      },
      thermopneumaticprocessingplant: {
        addRecipe: () => {},
        removeRecipe: () => {},
        removeAllRecipes: () => {}
      }
    },
    recipestages: {
      Recipes: {
        addShaped: () => {},
        addShapedMirrored: () => {},
        addShapeless: () => {},
        setRecipeStage: () => {}
      }
    },
    techreborn: {
      alloySmelter: {
        addRecipe: () => {},
        removeInputRecipe: () => {},
        removeRecipe: () => {}
      },
      assemblingMachine: {
        addRecipe: () => {},
        removeInputRecipe: () => {},
        removeRecipe: () => {}
      },
      blastFurnace: {
        addRecipe: () => {},
        removeInputRecipe: () => {},
        removeRecipe: () => {}
      },
      centrifuge: {
        addRecipe: () => {},
        removeInputRecipe: () => {},
        removeRecipe: () => {}
      },
      chemicalReactorRecipe: {
        addRecipe: () => {},
        removeInputRecipe: () => {},
        removeRecipe: () => {}
      },
      compressor: {
        addRecipe: () => {},
        removeInputRecipe: () => {},
        removeRecipe: () => {}
      },
      fusionReactor: {
        addRecipe: () => {},
        removeTopInputRecipe: () => {},
        removeBottomInputRecipe: () => {},
        removeRecipe: () => {}
      },
      implosionCompressor: {
        addRecipe: () => {},
        removeInputRecipe: () => {},
        removeRecipe: () => {}
      },
      industrialElectrolyzer: {
        addRecipe: () => {},
        removeInputRecipe: () => {},
        removeRecipe: () => {}
      },
      grinder: {
        addRecipe: () => {},
        removeInputRecipe: () => {},
        removeRecipe: () => {}
      },
      industrialSawmill: {
        addRecipe: () => {},
        removeInputRecipe: () => {},
        removeRecipe: () => {}
      },
      rollingMachine: {
        addShaped: () => {},
        addShapeless: () => {},
        removeRecipe: () => {}
      },
      scrapbox: {
        addScrapboxDrop: () => {}
      },
      vacuumFreezer: {
        addRecipe: () => {},
        removeInputRecipe: () => {},
        removeRecipe: () => {}
      }
    },
    TinkerStages: {
      addGeneralCraftingStage: () => {},
      addGeneralPartReplacingStage: () => {},
      addGeneralPartBuildingStage: () => {},
      addGeneralModifierStage: () => {},
      addToolTypeStage: () => {},
      addMaterialStage: () => {},
      addModifierStage: () => {}
    },
    vctweaker: {
      addShaped: () => {},
      addShapedMirrored: () => {},
      addShapeless: () => {}
    },
    WailaStages: {
      addWailaStage: () => {},
      addRequirement: () => {}
    }
  },
  mod: {
    caravans: {
      Caravan: {
        addFollower: () => {},
        registerCaravan: () => {}
      }
    }
  },
}