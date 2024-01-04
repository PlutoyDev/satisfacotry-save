# Classes and Structs

List of classes and structs that are saved in the save fie.
All the properties listed are UPROPERTY with `SaveGame` flag in the source code conviently listed here.
(After my painstaking work of going through all the source code and sieving out)

## Directly implements IFGSaveInterface

```c++
class AFGBuildable { // Buildables/FGBuildable.h
  /** The color slot of this buildable */
  UPROPERTY( EditAnywhere, SaveGame, Replicated, meta = (NoAutoJson = true) )
  uint8 mColorSlot = 0;

  /** Custom Color/Mat data. Stored in a TArray so it can be variable (or 0 size) to reduce save footprint since many buildings will only utilize the slot index */
  UPROPERTY( SaveGame, ReplicatedUsing = OnRep_CustomizationData, meta = ( NoAutoJson = true ) )
  FFactoryCustomizationData mCustomizationData;

  /** If the buildable is inside of a blueprint designer, this will be the reference to the designer. */
  UPROPERTY( SaveGame, Replicated )
  class AFGBuildableBlueprintDesigner* mBlueprintDesigner;

  /** Recipe this building was built with, e.g. used for refunds and stats. */
  UPROPERTY( SaveGame, Replicated )
  TSubclassOf< class UFGRecipe > mBuiltWithRecipe;

  /** If we were built as a variant, this is the class of the buildable we are a variant of. */
  UPROPERTY( SaveGame, Replicated )
  TSubclassOf< class AFGBuildable > mOriginalBuildableVariant;

  /** Time when this building was built */
  UPROPERTY( SaveGame, meta = (NoAutoJson = true) )
  float mBuildTimeStamp;

  /** If we were built as part of a blueprint, this will reference the blueprint proxy. */
  UPROPERTY( SaveGame, Replicated )
  class AFGBlueprintProxy* mBlueprintProxy;
}

class AFGCrabHatcher { // Creature/Enemy/FGCrabHatcher.h
  UPROPERTY(SaveGame, Replicated, BlueprintReadWrite, Category="FGCrabHatcher|Runtime")
  float mCurrentHealth;
}

class UFGAttachedLootComponent { // Creature/FGAttachedLootComponent.h
  UPROPERTY( SaveGame )
  class AFGItemPickup_Spawnable* mAttachedItemPickup;
}

class AFGCreatureSpawner { // Creature/FGCreatureSpawner.h
  /** Structure for keeping all data saved about enemies spawned */
  UPROPERTY( SaveGame )
  TArray< FSpawnData > mSpawnData;

  /** cached value to see if spawner is near a base */
  UPROPERTY( SaveGame )
  bool mCachedIsNearBase;
}

class UFGAmmoType { // Equipment/FGAmmoType.h
  /** Maximum distance in cm beyond which the effective range of the weapon will be considered minimal */
  UPROPERTY( SaveGame, EditDefaultsOnly, Category="Ammunition|Stats" )
  float mMaxAmmoEffectiveRange = 5000.0f;
}

class AFGEquipment {
  //Empty

} // Equipment/FGEquipment.h

class AFGBlueprintProxy { // FGBlueprintProxy.h
  //The name of this blueprint, used to get the BlueprintDescriptor.
  UPROPERTY( ReplicatedUsing = OnRep_BlueprintName, SaveGame )
  FText mBlueprintName;

  // The bounds of this blueprint, in local space.
  UPROPERTY( ReplicatedUsing = OnRep_LocalBounds, SaveGame)
  FBox mLocalBounds;
}

class AFGBlueprintSubsystem { // FGBlueprintSubsystem.h
  // For saving and loading purposes (and so we can track which Icons belong to which categories) we save them here
  UPROPERTY( SaveGame, Replicated )
  TArray< FBlueprintCategoryRecord > mBlueprintCategoryRecords;
}

class AFGBoomBoxPlayer { // FGBoomBoxPlayer.h
  UPROPERTY( SaveGame )
  FBoomBoxPlayerState mState;

  UPROPERTY( SaveGame, ReplicatedUsing=OnModeChanged )
  EBoomBoxMode mMode = EBoomBoxMode::Undefined;

  UPROPERTY( SaveGame, ReplicatedUsing=OnRep_RepeatMode )
  EBoomBoxRepeatMode mRepeatMode = EBoomBoxRepeatMode::RepeatTape;

  UPROPERTY( SaveGame, Replicated )
  class AFGCharacterPlayer* mOwningCharacter = nullptr;
}

class AFGBuildableSubsystem { // FGBuildableSubsystem.h
  // DEPRECATED - Use mColoreSlots_Data
  UPROPERTY( SaveGame, VisibleDefaultsOnly, Category = "Customization" )
  FColor mColorSlotsPrimary[ BUILDABLE_COLORS_MAX_SLOTS_LEGACY ];

  // DEPRECATED - Use mColoreSlots_Data
  UPROPERTY( SaveGame, VisibleDefaultsOnly, Category = "Customization" )
  FColor mColorSlotsSecondary[ BUILDABLE_COLORS_MAX_SLOTS_LEGACY ];

  // DEPRECATED - Use mColoreSlots_Data
  UPROPERTY( SaveGame, VisibleDefaultsOnly, Category = "Customization" )
  TArray< FLinearColor > mColorSlotsPrimary_Linear;

  // DEPRECATED - Use mColoreSlots_Data
  UPROPERTY( SaveGame, VisibleDefaultsOnly, Category = "Customization" )
  TArray< FLinearColor > mColorSlotsSecondary_Linear;

  // New color slot implementation
  UPROPERTY( SaveGame, EditDefaultsOnly, Category = "Customization" )
  TArray< FFactoryCustomizationColorSlot > mColorSlots_Data;
}

class AFGCharacterBase { // FGCharacterBase.h
  /** Keeps track of our current health */
  UPROPERTY( VisibleAnywhere, BlueprintReadOnly, SaveGame, Replicated )
  class UFGHealthComponent* mHealthComponent;
}

class UFGCircuit { // FGCircuit.h
  /** The id used to identify this circuit. */
  UPROPERTY( SaveGame, Replicated )
  int32 mCircuitID;

  /** List of all the components (nodes) in this circuit. */
  UPROPERTY( SaveGame )
  TArray< class UFGCircuitConnectionComponent* > mComponents;
}

class AFGCircuitSubsystem { // FGCircuitSubsystem.h
  // Empty
}

class UFGConnectionComponent { // FGConnectionComponent.h
  // Empty
}

class AFGCrate { // FGCrate.h
  /** The inventory of this crate */
  UPROPERTY( SaveGame, Replicated )
  class UFGInventoryComponent* mInventory;
}

class AFGDecorationActor { // FGDecorationActor.h
  /** The descriptor of this decoration */
  UPROPERTY( SaveGame, Replicated, BlueprintReadWrite, Meta = (ExposeOnSpawn) )
  TSubclassOf< class UFGDecorationDescriptor > mDecorationDescriptor;
}

class AFGDestructibleActor { // FGDestructibleActor.h
  /** State of the actor */
  UPROPERTY( EditAnywhere, SaveGame, ReplicatedUsing=OnRep_DestructibleActorState, Category = "Destructible" )
  EDestructibleActorState mDestructibleActorState;

  /** Deprecated, left for savegame compatibility */
  UPROPERTY( SaveGame )
  bool mHasBeenFractured;
}

class AFGDriveablePawn { // FGDriveablePawn.h
  //Empty
}

class AFGDroneStationInfo { // FGDroneStationInfo.h
  /** The station this info represents. */
  UPROPERTY( SaveGame )
  class AFGBuildableDroneStation* mStation;

  UPROPERTY( SaveGame, Replicated )
  AFGDroneStationInfo* mPairedStation;

  UPROPERTY( SaveGame, Replicated )
  FString mBuildingTag;

  UPROPERTY( SaveGame )
  TArray<FDroneTripInformation> mLatestDroneTrips;
}

class UFGDroneAction { // FGDroneVehicle.h
  //Empty
}

class AFGDropPod { // FGDropPod.h
  /** True when this has been opened */
  UPROPERTY( SaveGame, ReplicatedUsing = OnRep_HasBeenOpened )
  bool mHasBeenOpened;
  /** Contains the loot if any */
  UPROPERTY( SaveGame, Replicated )
  class UFGInventoryComponent* mInventory;
}

class AFGEventSubsystem { // FGEventSubsystem.h
  UPROPERTY( SaveGame )
  TMap< EEvents, FCalendarData > mStoredCalendarData; // 2020 Stored just in case we need it -K2

  UPROPERTY( SaveGame )
  TMap< TSubclassOf<class UFGCalendarRewards>, FCalendarData > mCalendarData; // 2021 and forward. Should handle as many calendars as we can think of.
}

class UFGFactoryLegsComponent { // FGFactoryLegsComponent.h
  /** Stored so that we know the offset of the feet */
  UPROPERTY( SaveGame, Replicated )
  TArray< FFeetOffset > mCachedFeetOffset;
}

class AFGFoliageRemoval { // FGFoliageRemoval.h
  /** Deprecated in favor of mRemovalLocations and mRemovalIndices */
  UPROPERTY( SaveGame )
  FRemovedInstanceArray mRemovedInstances;

  /**
   * Contains the saved locations of all removals of a foliage type/level
   */
  UPROPERTY( SaveGame )
  TSet< FVector > mRemovalLocations;

  /** The name of the level that this actor removes foliage from, so that the foliage system can find it */
  UPROPERTY( SaveGame )
  FName mLevelName;

  /** The name of mesh component to use the level */
  UPROPERTY( VisibleAnywhere, SaveGame )
  FName mFoliageTypeName;

  /** ServerOnly: The bounds of the level we have foliage in (@todo: Can we remove this savegame tag?)*/
  UPROPERTY( SaveGame )
  FBox mLevelBounds;
}

class AFGFoliageRemovalSubsystem { // FGFoliageRemovalSubsystem.h
  UPROPERTY(VisibleAnywhere, SaveGame)
  uint32 mSavedFoliageGridSize = 0;

  UPROPERTY(SaveGame)
  TMap<FIntVector, FFoliageRemovalSaveDataPerCell> mSaveData;

  UPROPERTY(SaveGame)
  TMap<FIntVector, FFoliageRemovalUnresolvedSaveDataPerCell> mUnresolvedSaveData;
}

class AFGGameMode { // FGGameMode.h
  /** Last AutoSave was this id */
  UPROPERTY( SaveGame )
  uint8 mLastAutoSaveId;

  /** The name of the session we are playing */
  UPROPERTY( SaveGame )
  FString mSaveSessionName;

  /** Selected starting point */
  UPROPERTY( SaveGame )
  FName mStartingPointTagName;
}

class AFGGamePhaseManager { // FGGamePhaseManager.h
  /** Current GamePhase */
  UPROPERTY( EditDefaultsOnly, SaveGame, ReplicatedUsing = OnRep_GamePhase, Category = "Progression" )
  TEnumAsByte< EGamePhase > mGamePhase;

  /** Speciefies what the different tiers cost */
  UPROPERTY( EditDefaultsOnly, SaveGame, ReplicatedUsing = OnRep_GamePhaseCosts, Category = "Progression" )
  TArray< FPhaseCost > mGamePhaseCosts;
}

class AFGGameRulesSubsystem { // FGGameRulesSubsystem.h
  // Probably doesn't need to be saved in most cases but if a dedicated server is saved and restarted before a player joins this might be lost
  UPROPERTY( SaveGame )
  int32 mStartingTier;

  UPROPERTY( SaveGame, Replicated )
  uint8 mHasInitialized = false;

  UPROPERTY( SaveGame, ReplicatedUsing=OnRep_GameRules )
  uint8 mUnlockInstantAltRecipes = false;

  UPROPERTY( SaveGame, ReplicatedUsing=OnRep_GameRules )
  uint8 mUnlockAllMilestoneSchematics = false;

  UPROPERTY( SaveGame, ReplicatedUsing=OnRep_GameRules )
  uint8 mUnlockAllResourceSinkSchematics = false;

  UPROPERTY( SaveGame, ReplicatedUsing=OnRep_GameRules )
  uint8 mUnlockAllResearchSchematics = false;

  UPROPERTY( SaveGame, ReplicatedUsing=OnRep_GameRules  )
  uint8 mDisableArachnidCreatures = false;

  // Any unlock can be obtained without paying the resource cost.
  UPROPERTY( SaveGame, ReplicatedUsing=OnRep_NoUnlockCost )
  uint8 mNoUnlockCost = false;
}

class AFGGameState { // FGGameState.h
  /** Spawned subsystems */
  UPROPERTY( SaveGame, Replicated )
  class AFGTimeOfDaySubsystem* mTimeSubsystem;

  UPROPERTY( SaveGame, Replicated )
  class AFGStorySubsystem* mStorySubsystem;

  UPROPERTY( SaveGame, Replicated )
  class AFGRailroadSubsystem* mRailroadSubsystem;

  UPROPERTY( SaveGame, Replicated )
  class AFGCircuitSubsystem* mCircuitSubsystem;

  UPROPERTY( SaveGame, Replicated )
  class AFGRecipeManager* mRecipeManager;

  UPROPERTY( SaveGame, Replicated )
  class AFGSchematicManager* mSchematicManager;

  UPROPERTY( SaveGame, Replicated )
  class AFGGamePhaseManager* mGamePhaseManager;

  UPROPERTY( SaveGame, Replicated )
  class AFGResearchManager* mResearchManager;

  UPROPERTY( SaveGame, Replicated )
  class AFGTutorialIntroManager* mTutorialIntroManager;

  UPROPERTY( SaveGame, Replicated )
  class AFGActorRepresentationManager* mActorRepresentationManager;

  UPROPERTY( SaveGame, Replicated )
  class AFGMapManager* mMapManager;

  UPROPERTY( SaveGame, Replicated )
  class AFGPipeSubsystem* mPipeSubsystem;

  UPROPERTY( SaveGame, Replicated )
  class AFGUnlockSubsystem* mUnlockSubsystem;

  UPROPERTY( SaveGame, Replicated )
  class AFGResourceSinkSubsystem* mResourceSinkSubsystem;

  UPROPERTY( SaveGame )
  class AFGStatisticsSubsystem* mStatisticsSubsystem;

  UPROPERTY( SaveGame, Replicated )
  class AFGBlueprintSubsystem* mBlueprintSubsystem;

  UPROPERTY( SaveGame, Replicated )
  class AFGGameRulesSubsystem* mGameRulesSubsystem;

  /** This array keeps track of what map areas have been visited this game */
  UPROPERTY( SaveGame, ReplicatedUsing = OnRep_MapAreaVisited )
  TArray< TSubclassOf< UFGMapArea > > mVisitedMapAreas;

  /** All items we have picked up that also are relevant to know if we picked up */
  UPROPERTY( SaveGame, Replicated )
  TArray<TSubclassOf< class UFGItemDescriptor>> mPickedUpItems;

  /** The total play time when loaded this save */
  UPROPERTY( SaveGame, Replicated )
  int32 mPlayDurationWhenLoaded;

  UPROPERTY( SaveGame, Replicated )
  FString mReplicatedSessionName;

  UPROPERTY( SaveGame, ReplicatedUsing = OnRep_OnlineSessionVisibility)
  ESessionVisibility mSessionVisibility = ESessionVisibility::SV_Invalid;

  /** The player adjustable color slots used by the buildable lights. We store it here instead of buildable subsystem since that subsystem isn't replicated */
  UPROPERTY( SaveGame, ReplicatedUsing = OnRep_BuildableLightColorSlots )
  TArray< FLinearColor > mBuildableLightColorSlots;

  /** Customizable Global Color Presets. Players can add / remove */
  UPROPERTY( SaveGame, EditDefaultsOnly, Replicated )
  TArray< FGlobalColorPreset > mPlayerGlobalColorPresets;

  /** Data to map a SwatchGroup to the Color Swatch it should use when building buildables of that type */
  UPROPERTY( SaveGame, EditDefaultsOnly, Replicated )
  TArray< FSwatchGroupData > mSwatchGroupDatum;

  /** Track if a hub part is needed for adding to player inventory when they respawn */
  UPROPERTY( SaveGame )
  bool mForceAddHubPartOnSpawn;

  /** Cheat bool for having no cost for stuff  */
  UPROPERTY( SaveGame, Replicated )
  bool mCheatNoCost;

  /** Cheat bool for not requiring power */
  UPROPERTY( SaveGame, ReplicatedUsing=OnRep_CheatNoPower )
  bool mCheatNoPower;

  /** Cheat bool for not requiring fuel */
  UPROPERTY( SaveGame, Replicated )
  bool mCheatNoFuel;

  /** There can only be one trading post in the game, so we keep track it here so that we also can replicate it to client */
  UPROPERTY( SaveGame, Replicated )
  bool mIsTradingPostBuilt;

  /** The first time you build a trading post we want the landing animation to play */
  UPROPERTY( SaveGame, Replicated )
  bool mHasInitalTradingPostLandAnimPlayed;

  /** There can only be one tow truck in the game, so we keep track it here so that we also can replicate it to client */
  UPROPERTY( SaveGame, Replicated )
  bool mIsSpaceElevatorBuilt;

  /** The leaderboard for tetromino mini game */
  UPROPERTY( SaveGame, ReplicatedUsing=OnRep_TetrominoLeaderBoard )
  TArray< FMiniGameResult > mTetrominoLeaderBoard;

  /** The public todo list. Only replicated on initial send. Then RPCed through FGPlayerState. */
  UPROPERTY( SaveGame, Replicated )
  FString mPublicTodoList;

  /** If we have given the first player that joins the starting recipes or not. Based on which tier you start on */
  UPROPERTY( SaveGame )
  bool mHasGivenStartingRecipes = false;

  /** If the player have enabled creative mode for this game. This means they can change settings in advanced game settings menu */
  UPROPERTY( SaveGame, Replicated )
  bool mIsCreativeModeEnabled = false;
}

class AFGGasPillarCloud { // FGGasPillarCloud.h
  UPROPERTY( SaveGame, ReplicatedUsing=OnRep_RemovedWorldLocations )
  TArray< FVector > mRemovedWorldLocations;
}

class UFGHealthComponent { // FGHealthComponent.h
  /** Keeps track of our current health */
  UPROPERTY( SaveGame, Replicated, VisibleAnywhere, Category = "Health" )
  class UFGHealthComponent* mHealthComponent;

  /** Custom Color/Mat data. Stored in a TArray so it can be variable (or 0 size) to reduce save footprint since many buildings will only utilize the slot index */
  UPROPERTY( SaveGame, ReplicatedUsing = OnRep_CustomColorData )
  FFactoryCustomizationData mCustomizationData;

  /** Recipe this vehicle was built with, e.g. used for refunds and stats. */
  UPROPERTY( SaveGame, Replicated )
  TSubclassOf< class UFGRecipe > mBuiltWithRecipe;

  /** Is the movement being simulated? */
  UPROPERTY( ReplicatedUsing = OnRep_IsSimulated, SaveGame )
  bool mIsSimulated;
}

class UFGHotbarShortcut { // FGHotbarShortcut.h
  /**
    * Index of the shortcut in the hotbar.
    * Used to be able to dispatch shortcut events when the object is destroyed by the replication.
    * We do not need a RepNotify for it as the object should always receive it by the end object is killed by replication.
    */
  int32 mShortcutIndex
}

class UFGInventoryComponent { // FGInventoryComponent.h
/** When we resize the inventory we save how much bigger or smaller the inventory was made */
UPROPERTY( SaveGame )
int32 mAdjustedSizeDiff;

/** All items in the inventory */
UPROPERTY( SaveGame, ReplicatedUsing = OnRep_InventoryStacks )
TArray< FInventoryStack > mInventoryStacks;

/** In some rare cases we don't want to use the StackSize to limit the slot, so this way we can have larger or smaller slots */
UPROPERTY( SaveGame, Replicated )
TArray< int32 > mArbitrarySlotSizes;

/** This are the allowed inventory items, this we we can "filter" in BluePrint as well. */
UPROPERTY( SaveGame, ReplicatedUsing = OnRep_AllowedItemDescriptors )
TArray< TSubclassOf < UFGItemDescriptor > > mAllowedItemDescriptors;

/** Can stuff in this inventory be rearranged, that is moved from one slot to the other? */
UPROPERTY( SaveGame, Replicated )
bool mCanBeRearrange;
}

class AFGItemPickup { // FGItemPickup.h
  // The items we want to be able to pickup
  UPROPERTY( SaveGame, EditAnywhere, Category = "Item", ReplicatedUsing = OnRep_PickedUp )
  FInventoryStack mPickupItems;

  /** What day count was the item last updated */
  UPROPERTY( SaveGame )
  int32 mUpdatedOnDayNr;

  /** Current state for this item */  UPROPERTY( SaveGame, ReplicatedUsing = OnRep_StateUpdated )
  EItemState mItemState;

  /** Current state for this item */
  UPROPERTY( SaveGame )
  int32 mSavedNumItems;

  /** How many respawns are allowed on this item */
  UPROPERTY( SaveGame )
  int32 mNumRespawns;
}

class AFGMapManager { // FGMapManager.h
/** The raw pixel data for the fog of war texture. Each element represents a channel for a pixel */
UPROPERTY( SaveGame )
TArray<uint8> mFogOfWarRawData;
UPROPERTY( SaveGame )
TArray<FMapMarker> mMapMarkers;
/** Highlighted marker can be almost anything that is an actor representation on the map. The underlying saved data could be an FMapMarker or a actor. */
UPROPERTY( SaveGame )
TArray< FHighlightedMarkerPair > mHighlightedMarkers;
}

class UFGHighlightedMarker { // FGMapMarker.h
  //Empty
}

class AFGPipeNetwork { // FGPipeNetwork.h
  /**
   * Unique id of this network, assigned at spawn.
   * Note: This is not persistent between play sessions.
   */
  UPROPERTY( SaveGame, Replicated )
  int32 mPipeNetworkID;

  /** The type of liquid in this network. */
  UPROPERTY( SaveGame, Replicated )
  TSubclassOf< UFGItemDescriptor > mFluidDescriptor;

  /** Compiled during save, and Interface classes are extracted on load. Stores the mFluidIntegrants in a UPROPERTY type */
  UPROPERTY( SaveGame )
  TArray < TScriptInterface< class IFGFluidIntegrantInterface > > mFluidIntegrantScriptInterfaces;
}

class AFGPipeSubsystem { // FGPipeSubsystem.h
  //Empty
}

class UFGPlayerHotbar { // FGPlayerState.h
  /** Shortcuts that this hotbar has, fixed size and with potential null pointers. */
  UPROPERTY( SaveGame, ReplicatedUsing = OnRep_Shortcuts )
  TArray< UFGHotbarShortcut* > mShortcuts;
}

class AFGPlayerState { // FGPlayerState.h
  /** Holds the item stacks that the player can get copied to their inventory on respawn. */
  UPROPERTY( SaveGame )
  FInventoryToRespawnWith mInventoryToRespawnWith;

  /** Legacy hotbars in the game */
  UPROPERTY( SaveGame )
  TArray< FHotbar > mHotbars_DEPRECATED;

  /** Hotbars that the player has, in the new format */
  UPROPERTY( SaveGame, ReplicatedUsing = OnRep_PlayerHotbars )
  TArray< UFGPlayerHotbar* > mPlayerHotbars;

  /** The index of the current hotbar*/
  UPROPERTY( SaveGame, ReplicatedUsing = OnRep_CurrentHotbarIndex )
  int32 mCurrentHotbarIndex;

  /** Array of all set buildable categories and their default material desc */
  UPROPERTY( SaveGame, Replicated )
  TArray< FSubCategoryMaterialDefault > mBuildableSubCategoryDefaultMatDesc;


  /**
   * Array of all set material categories and their default material desc.
   * This acts as a global set. When we change this, we also update the mBuildableSubcategoryDefaultMatDesc array
   */
  UPROPERTY( SaveGame, Replicated )
  TArray< FSubCategoryMaterialDefault > mMaterialSubCategoryDefaultMatDesc;

  /** Recipes that are new to the player. This is only for UI feedback and does not affect the players ability to use the recipe  */
  UPROPERTY( SaveGame, Replicated )
  TArray< TSubclassOf< class UFGRecipe > > mNewRecipes;

  /** Gameplay Rules set specifically for this player. */
  UPROPERTY( SaveGame, ReplicatedUsing=OnRep_PlayerRules )
  FPlayerRules mPlayerRules;

  /** Pawn we should take control of when rejoining game/loading game */
  UPROPERTY( SaveGame )
  class APawn* mOwnedPawn;

  /** Set to true after we have received our initial items */
  UPROPERTY( SaveGame )
  uint8 mHasReceivedInitialItems;

  UPROPERTY(SaveGame, Replicated)
  TArray< TSubclassOf< class UFGMapArea > > mVisitedAreas;

  UPROPERTY( SaveGame, Replicated )
  FFactoryCustomizationColorSlot mCustomColorData;

  /** The settings for the players shopping list. Only replicated on initial send. Then RPCed back to server for saving. */
  UPROPERTY( EditDefaultsOnly, SaveGame, Replicated, Category = "Shopping List")
  FShoppingListSettings mShoppingListSettings;

  /** Each local player has their own tutorial subsystem */
  UPROPERTY( SaveGame )
  class UFGTutorialSubsystem* mTutorialSubsystem;

  /** Data about all messages that can be displayed in the codex */
  UPROPERTY( SaveGame )
  TArray< FMessageData > mMessageData;

  /** List of equipment classes that have been equipped at least once. */
  UPROPERTY( SaveGame, Replicated )
  TArray< TSubclassOf< class AFGEquipment > > mRememberedFirstTimeEquipmentClasses;

  /** Total number of arm equipment slots for this player */
  UPROPERTY( SaveGame, Replicated )
  int32 mNumArmSlots;

  /** True if we only should show affordable recipes in manufacturing widgets  */
  UPROPERTY( SaveGame, Replicated )
  bool mOnlyShowAffordableRecipes;

  /** The item categories that the user have collapsed in manufacturing widgets  */
  UPROPERTY( SaveGame, Replicated )
  TArray< TSubclassOf< class UFGItemCategory > > mCollapsedItemCategories;

  UPROPERTY( SaveGame, Replicated )
  TArray< ERepresentationType > mFilteredOutMapTypes;

  UPROPERTY( SaveGame, Replicated )
  TArray< ERepresentationType > mFilteredOutCompassTypes;

  /** The map categories that the user have collapsed in the map widget */
  UPROPERTY( SaveGame, Replicated )
  TArray< ERepresentationType > mCollapsedMapCategories;

  /** How many inventory slots the player has observed that they have. Used to show when we have new available slots in the UI  */
  UPROPERTY( SaveGame, Replicated )
  int32 mNumObservedInventorySlots;

  /** The schematics the player has selected as their favorites in the awesome shop */
  UPROPERTY( SaveGame, Replicated )
  TArray< TSubclassOf< class UFGSchematic > > mFavoriteShopSchematics;

  /** The personal todolist. Only replicated on initial send. Then RPCed back to server for saving. */
  UPROPERTY( SaveGame, Replicated )
  FString mPrivateTodoList;

  UPROPERTY( SaveGame, Replicated )
  class UFGShoppingListComponent* mShoppingListComponent;
  TArray< TSubclassOf< class UUserWidget > > mOpenedWidgetsThisSession;

  UPROPERTY( SaveGame, Replicated )
  TArray< TSubclassOf< class UUserWidget > > mOpenedWidgetsPersistent;

  /** The player specific schematics that this player have purchased */
  UPROPERTY( SaveGame, ReplicatedUsing=OnRep_PlayerSpecificSchematics )
  TArray< TSubclassOf< class UFGSchematic > > mPlayerSpecificSchematics;
}

class AFGPortableMiner { // FGPortableMiner.h
  /** The resource node we want to extract from */
  UPROPERTY( SaveGame, Replicated, BlueprintReadWrite, Category = "Resource" )
  class AFGResourceNode* mExtractResourceNode;

  /** The inventory of the factory node */
  UPROPERTY( SaveGame, Replicated )
  class UFGInventoryComponent* mOutputInventory;
}

class UFGPowerInfoComponent { // FGPowerInfoComponent.h
  /** Power to draw from the circuit. */
  UPROPERTY( SaveGame, Replicated )
  float mTargetConsumption;

  /** Power to always provide to the circuit. */
  UPROPERTY( SaveGame, Replicated )
  float mBaseProduction;

  /** Power to optionally provide to the circuit. */
  UPROPERTY( SaveGame, Replicated )
  float mDynamicProductionCapacity;

  UPROPERTY( SaveGame, Replicated )
  uint8 mIsFullBlast;
}
class AFGProjectile { // FGProjectile.h
  UPROPERTY( SaveGame, EditDefaultsOnly, Replicated, BlueprintReadOnly, Category = "Projectile" )
  FLinearColor mProjectileColor;

  UPROPERTY( SaveGame, EditDefaultsOnly, Replicated, BlueprintReadOnly, Category = "Projectile" )
  float mProjectileScale;

  UPROPERTY( BlueprintReadOnly, Replicated, SaveGame, Category = "Projectile" )
  class UFGAmmoTypeProjectile* mSourceAmmoDescriptor;

  UPROPERTY( SaveGame, BlueprintReadWrite, Category = "Projectile" )
  float mProjectileCurrentHealth;

  /** Distance traveled by the projectile since spawn. */
  UPROPERTY( SaveGame )
  float mTraveledDistance;

  UPROPERTY( SaveGame )
  FTimerHandle mSecondaryTriggerDelayTimer;
}

class AFGRailroadSubsystem { // FGRailroadSubsystem.h
  /** All station identifiers in the world. */
  UPROPERTY( SaveGame, Replicated )
  TArray< class AFGTrainStationIdentifier* > mTrainStationIdentifiers;

  /** All the trains in the world. */
  UPROPERTY( SaveGame, Replicated )
  TArray< class AFGTrain* > mTrains;
}

class AFGRailroadTimeTable { // FGRailroadTimeTable.h
  /** Array of destinations this train will visit. */
  UPROPERTY( SaveGame, Replicated, VisibleAnywhere, Category = "Time Table" )
  TArray< FTimeTableStop > mStops;

  /** Current stop the train is at or heading to. */
  UPROPERTY( SaveGame, Replicated, VisibleAnywhere, Category = "Time Table" )
  int32 mCurrentStop;
}

class AFGRailroadVehicleRerailHologram { // FGRailroadVehicleRerailHologram.h
  //Empty
}

class AFGRecipeManager { // FGRecipeManager.h
  /** All recipes that are available to the producers, i.e. build gun, workbench, manufacturers etc. */
  UPROPERTY( SaveGame, ReplicatedUsing = OnRep_AvailableRecipes )
  TArray< TSubclassOf< UFGRecipe > > mAvailableRecipes;

  /** All customization Recipes. A subset of all recipes for quicker customization look ups */
  UPROPERTY( SaveGame, Replicated )
  TArray< TSubclassOf< UFGCustomizationRecipe > > mAvailableCustomizationRecipes;
  }

class AFGResearchManager { // FGResearchManager.h
  UPROPERTY( SaveGame, Replicated )
  TArray<TSubclassOf<class UFGResearchTree>> mUnlockedResearchTrees;

  /** What research has been conducted and is complete. */
  UPROPERTY( SaveGame, Replicated )
  TArray<FResearchData> mCompletedResearch;

  /** Used save the current ongoing research, saved research is restarted on load */
  UPROPERTY( SaveGame )
  TArray<FResearchTime> mSavedOngoingResearch;

  UPROPERTY( SaveGame, Replicated )
  bool mIsActivated;
}

class AFGResourceSinkSubsystem { // FGResourceSinkSubsystem.h

  /** The total number of resource sink points we have accumulated in total
    * The index in the array is matched to the EResourceSinkTrack integer value
    */
  UPROPERTY( SaveGame, Replicated )
  TArray< int64 > mTotalPoints;

  UPROPERTY( SaveGame ) // DEPRECATED replaced by mTotalPoints. Still left for migration to new system
  int64 mTotalResourceSinkPoints;

  /** The current point level we have reached, this value only increases and isn't affected by printing coupons
    * The index in the array is matched to the EResourceSinkTrack integer value
    */
  UPROPERTY( SaveGame, Replicated )
  TArray< int32 > mCurrentPointLevels;
  UPROPERTY( SaveGame ) // DEPRECATED replaced by mCurrentPointLevels. Still left for migration to new system
  int32 mCurrentPointLevel;

  /** The number of coupons we have to our disposal to print and use */
  UPROPERTY( SaveGame, Replicated )
  int32 mNumResourceSinkCoupons;

  /** The data for the global points history of the resource sink subsystem
    * The index in the array is matched to the EResourceSinkTrack integer value
    */
  UPROPERTY( SaveGame, Replicated )
  TArray< FResourceSinkHistory > mGlobalPointHistoryValues;
  UPROPERTY( SaveGame ) // DEPRECATED replaced by mGlobalPointHistoryValues. Still left for migration to new system
  TArray<int32> mGlobalPointHistory;

  /** The items that the player tried to sink that you can't sink that is also present in mFailedItemSinkMessages */
  UPROPERTY( SaveGame )
  TArray<TSubclassOf<class UFGItemDescriptor>> mItemsFailedToSink;

  /** Have we ever tried to sink any item that you can't sink that is not present in mFailedItemSinkMessages */
  UPROPERTY( SaveGame )
  bool mAnyGenericItemsFailedToSink;

  /** Have we sunken a item of the coupon class, Used to give a schematic */
  UPROPERTY( SaveGame )
  bool mIsCouponEverSunk;

  /** Lists sunken item that have a special reward that we want to know if they been sunk or not, Used to give rewards */
  UPROPERTY( SaveGame )
  TSet<TSubclassOf<class UFGItemDescriptor> > mSunkenItemsWithCustomReward;
}

class AFGSchematicManager { // FGSchematicManager.h
  /** All schematics that are available to the player */
  UPROPERTY( SaveGame, Replicated )
  TArray< TSubclassOf< UFGSchematic > > mAvailableSchematics;

  /** Once schematic is purchased it ends up here */
  UPROPERTY( EditDefaultsOnly, SaveGame, ReplicatedUsing = OnRep_PurchasedSchematic, Category = "Schematic" )
  TArray< TSubclassOf< UFGSchematic > > mPurchasedSchematics;

  /* This keeps track of what players have paid off on different schematics */
  UPROPERTY( SaveGame, ReplicatedUsing = OnRep_PaidOffOnSchematic )
  TArray< FSchematicCost > mPaidOffSchematic;

  /** The active schematic the resources is being sold towards. */
  UPROPERTY( SaveGame, ReplicatedUsing = OnRep_ActiveSchematic )
  TSubclassOf< UFGSchematic > mActiveSchematic;

  /** Used to save the ship land timestamp */
  UPROPERTY( SaveGame )
  float mShipLandTimeStampSave;
}

class AFGSporeFlower { // FGSporeFlower.h
  //Empty
}

class AFGStatisticsSubsystem { // FGStatisticsSubsystem.h
  /** How many consumables we have consumed. Nut, berrys, medkit and similar. */
  UPROPERTY( SaveGame )
  TMap< TSubclassOf< class UFGConsumableDescriptor >, int32 > mConsumablesConsumedCount;

  /** How many creatures we have killed */
  UPROPERTY( SaveGame )
  TMap< TSubclassOf< class AFGCreature >, int32 > mCreaturesKilledCount;

  /** How many items we have manually crafted */
  UPROPERTY( SaveGame )
  TMap< TSubclassOf< class UFGItemDescriptor >, int32 > mItemsManuallyCraftedCount;

  /** How many actors of each class we have built/dismantled */
  UPROPERTY( SaveGame )
  TMap< TSubclassOf< class AActor >, FActorBuiltData > mActorsBuiltCount;

  UPROPERTY( SaveGame )
  TMap< TSubclassOf< UFGItemDescriptor >, uint64 > mItemsProduced;
}

class AFGStorySubsystem { // FGStorySubsystem.h
  /** array of item descriptor class/message and if they have been found already */
  UPROPERTY( SaveGame, VisibleDefaultsOnly, Category = "Gameplay Narrative" )
  TArray< FItemFoundData > mItemFoundData;
}

class AFGTimeOfDaySubsystem { // FGTimeSubsystem.h
  /**  How many seconds that has passed into our current day */
  UPROPERTY( SaveGame )
  float mDaySeconds;
  /** The current day that has passed */
  UPROPERTY( SaveGame, Replicated )
  int32 mNumberOfPassedDays;
}

class AFGTrain { // FGTrain.h
  /** Physics simulation for the train */
  UPROPERTY( SaveGame )
  FTrainSimulationData mSimulationData;

  /** The name of this train. */
  UPROPERTY( SaveGame, Replicated, VisibleAnywhere, Category = "Train" )
  FText mTrainName;

  /** Train are a doubly linked list, use TTrainIterator to iterate over a train. */
  UPROPERTY( SaveGame )
  class AFGRailroadVehicle* FirstVehicle;

  UPROPERTY( SaveGame )
  class AFGRailroadVehicle* LastVehicle;

  /** This trains time table. */
  UPROPERTY( SaveGame, Replicated, VisibleAnywhere, Category = "Train" )
  class AFGRailroadTimeTable* TimeTable;

  /** Is this train self driving */
  UPROPERTY( SaveGame, ReplicatedUsing = OnRep_IsSelfDrivingEnabled, VisibleAnywhere, Category = "Train" )
  bool mIsSelfDrivingEnabled;

  /** True if this train is derailed and needs player attention. */
  UPROPERTY( SaveGame, ReplicatedUsing = OnRep_IsDerailed, VisibleAnywhere, Category = "Train" )
  bool mIsDerailed;
}

class AFGTrainStationIdentifier { // FGTrainStationIdentifier.h
  /** The station this info represents. */
  UPROPERTY( SaveGame, ReplicatedUsing = OnRep_Station )
  class AFGBuildableRailroadStation* mStation;

  /** Cached here for clients. */
  UPROPERTY( SaveGame, ReplicatedUsing = OnRep_StationName )
  FText mStationName;
}

class AFGTutorialIntroManager { // FGTutorialIntroManager.h
  /** Has a trading post been built */
  UPROPERTY( SaveGame )
  bool mTradingPostBuilt;

  /** Array of pending tutorial IDs that should be shown when possible ( no other widgets on screen etc ) */
  UPROPERTY( Replicated, SaveGame )
  EIntroTutorialSteps mPendingTutorial;

  /** Indicates if the player has completed the introduction tutorial */
  UPROPERTY( ReplicatedUsing=OnRep_HasCompletedIntroTutorial, EditDefaultsOnly, SaveGame, Category = "Tutorial" )
  bool mHasCompletedIntroTutorial;

  /** Indicates that the introduction sequence is done (right now, drop pod sequence) */
  UPROPERTY( Replicated, SaveGame )
  bool mHasCompletedIntroSequence;

  /** Cached reference of trading post */
  UPROPERTY( SaveGame, Replicated )
  class AFGBuildableTradingPost* mTradingPost;

  UPROPERTY( SaveGame )
  bool mDidPickUpIronOre;

  /** Checks if we have dismantled the drop pod */
  UPROPERTY( SaveGame )
  bool mDidDismantleDropPod;

  /** Checks if we equipped the stun spear */
  UPROPERTY( SaveGame )
  bool mDidEquipStunSpear;

  /** Bool for the step 1 schematic */
  UPROPERTY( SaveGame )
  bool mDidStep1Upgrade;

  /** Bool for the step 1.5 schematic */
  UPROPERTY( SaveGame )
  bool mDidStep1_5Upgrade;

  /** Bool for the step 2 schematic */
  UPROPERTY( SaveGame )
  bool mDidStep2Upgrade;

  /** Bool for the step 3 schematic */
  UPROPERTY( SaveGame )
  bool mDidStep3Upgrade;

  /** Bool for the step 4 schematic */
  UPROPERTY( SaveGame )
  bool mDidStep4Upgrade;

  /** Bool for the step5 schematic */
  UPROPERTY( SaveGame )
  bool mDidStep5Upgrade;

  /** The upgrade level we have on our trading post */
  UPROPERTY( SaveGame, ReplicatedUsing = OnRep_TradingPostLevel )
  int32 mTradingPostLevel;

  /** Bool for when codex has been opened */
  UPROPERTY( SaveGame )
  bool mDidOpenCodex;
}

class UFGTutorialSubsystem { // FGTutorialSubsystem.h
  /** classes of things we have build */
  UPROPERTY( SaveGame )
  TArray< TSubclassOf< UObject > > mBuildingsBuilt;

  /** Used to indicate if we should push the intro messages */
  UPROPERTY( SaveGame )
  bool mHasSeenIntroTutorial;

  /** Needed to set up delegates */
  UPROPERTY( SaveGame )
  class AFGPlayerState* mOwningPlayerState;
}

class AFGUnlockPickup { // FGUnlockPickup.h
  /** The current state of this pickup. Replicated. */
  UPROPERTY( ReplicatedUsing=OnRep_PickedUp, SaveGame, BlueprintReadOnly )
  ESchematicPickupState mPickupState = ESchematicPickupState::Unknown;
}

class AFGUnlockSubsystem { // FGUnlockSubsystem.h
  UPROPERTY( SaveGame, Replicated )
  TArray< TSubclassOf< class UFGTapeData > > mUnlockedTapes;

  /** The names of the players that have unlocked the FICSIT Checkmark™ */
  UPROPERTY( SaveGame, ReplicatedUsing=OnRep_PlayerCheckmarks )
  TArray< FGCheckmarkUnlockData > mPlayersWithCheckmark;
}

class AFGSavedWheeledVehiclePath { // FGVehicleSubsystem.h
  UPROPERTY( SaveGame, Replicated, BlueprintReadOnly )
  FString mPathName;

  /**
   *  Deprecated, use mTargetList->mVehicleType instead
   */
  UPROPERTY( SaveGame )
  TSubclassOf< class AFGWheeledVehicle > mOriginalVehicleType;

  /**
   * The saved path.
   */
  UPROPERTY( SaveGame, Replicated, BlueprintReadOnly )
  class AFGDrivingTargetList* mTargetList;
}

class AFGVehicleSubsystem { // FGVehicleSubsystem.h
  /**
   * All the paths that are saved by players
   */
  UPROPERTY( SaveGame, Replicated )
  TArray< AFGSavedWheeledVehiclePath* > mSavedPaths;
}

class AFGWorldGridSubsystem { // FGWorldGridSubsystem.h
  //Empty
}

class AFGWorldSettings { // FGWorldSettings.h
  UPROPERTY( SaveGame )
  class AFGBuildableSubsystem* mBuildableSubsystem;
}

class AFGResourceNodeBase { // Resources/FGResourceNodeBase.h
  /** Bool for is we should spawn particle - @todo Do we really need to save this? //[Dylan 3/2/2020] */
  UPROPERTY( Replicated, EditDefaultsOnly, SaveGame, Category = "Resources" )
  bool mDoSpawnParticle;
}

class UFGShoppingListComponent { // ShoppingList/FGShoppingListComponent.h
  // We could look into saving and replicating mShoppingListObjects as subobjects but this feels cheaper network wise
  UPROPERTY( SaveGame, ReplicatedUsing=OnRep_ShoppingListBlueprints )
  TArray< FShoppingListBlueprintEntry > mShoppingListBlueprints;

  UPROPERTY( SaveGame, ReplicatedUsing=OnRep_ShoppingListRecipes )
  TArray< FShoppingListRecipeEntry > mShoppingListRecipes;
}

class AFGDockingStationInfo { // WheeledVehicles/FGDockingStationInfo.h
  UPROPERTY( SaveGame, ReplicatedUsing = OnRep_Status )
  EDockingStationStatus mStatus = EDockingStationStatus::DSS_Operational;

  UPROPERTY( SaveGame )
  class AFGBuildableDockingStation* mStation;

  UPROPERTY( SaveGame, ReplicatedUsing = OnRep_BuildingTag )
  FString mBuildingTag;
}

class AFGTargetPoint { // WheeledVehicles/FGTargetPoint.h
  /** Reference to the next target point ( used in linked list ) */
  UPROPERTY( SaveGame, Replicated )
  AFGTargetPoint* mNext;

  /** Accumulated wait time for this node */
  UPROPERTY( SaveGame, Replicated )
  float mWaitTime;

  /** Target speed at this node */
  UPROPERTY( SaveGame, ReplicatedUsing = OnRep_TargetSpeed )
  int32 mTargetSpeed = -1;
}

class AFGDrivingTargetList { // WheeledVehicles/FGTargetPointLinkedList.h
  /** First node in linked list */
  UPROPERTY( SaveGame, Replicated )
  class AFGTargetPoint* mFirst;

  /** Last node in linked list */
  UPROPERTY( SaveGame, Replicated )
  class AFGTargetPoint* mLast;

  /** Deprecated and kept for save compatibility. Use AFGWheeledVehicle::mCurrentTarget instead. */
  UPROPERTY( SaveGame )
  class AFGTargetPoint* mCurrentTarget;

  UPROPERTY( SaveGame, Replicated, BlueprintReadOnly )
  TSubclassOf< class AFGWheeledVehicle > mVehicleType;

  /** Should targets nodes be visible */
  UPROPERTY( SaveGame, ReplicatedUsing = OnRep_IsPathVisible )
  bool mIsPathVisible = true;

  /**
    * The amount of fuel a vehicle on this path will consume during one lap while in automated mode, equally divided over time
    */
  UPROPERTY( SaveGame, Replicated )
  float mPathFuelConsumption = 0.0f;
}

class UFGTargetPointLinkedList { // WheeledVehicles/FGTargetPointLinkedList.h
  /** First node in linked list */
  UPROPERTY( SaveGame )
  class AFGTargetPoint* mFirst;

  /** Last node in linked list */
  UPROPERTY( SaveGame )
  class AFGTargetPoint* mLast;

  /** Current node */
  UPROPERTY( SaveGame )
  class AFGTargetPoint* mCurrentTarget;
}

class AFGWheeledVehicleInfo { // WheeledVehicles/FGWheeledVehicleInfo.h
  /**
    * The host vehicle. May be nullptr on client if it is net culled.
    */
  UPROPERTY( SaveGame )
  class AFGWheeledVehicle* mVehicle;

  /**
    * The next target that this vehicle is driving towards
    */
  UPROPERTY( Replicated, SaveGame )
  class AFGTargetPoint* mTarget = nullptr;

  /**
    * The type of fuel that is currently loaded into this vehicle.
    */
  UPROPERTY( Replicated, SaveGame )
  TSubclassOf< class UFGItemDescriptor > mCurrentFuelClass;
}

```

## Inherits class that implements `IFGSaveInterface`

```c++
class FACTORYGAME_API UFGAmmoTypeHomingBase : public UFGAmmoType {
  // Empty
}

class FACTORYGAME_API UFGAmmoTypeProjectile : public UFGAmmoTypeHomingBase
{
  /** Types and values of damages dealt at the end of life of the projectile. Includes FX setup. */
  UPROPERTY( SaveGame, EditDefaultsOnly, Instanced, Category = "Ammunition|Damage" )
  TArray< UFGDamageType* > mDamageTypesAtEndOfLife;
}

class FACTORYGAME_API AFGCreature : public AFGCharacterBase
{
  /** Spline we are set to follow */
  UPROPERTY( SaveGame, EditInstanceOnly, Category = "Creature" )
  class AFGSplinePath* mSpline;

  /** Should this creature be able to persist in the world */
  UPROPERTY( SaveGame, EditAnywhere, Category = "Creature" )
  bool mIsPersistent;

  /** Reference to the spawner that handles this creature */
  UPROPERTY( SaveGame )
  class AFGCreatureSpawner* mOwningSpawner;
}

class FACTORYGAME_API AFGCharacterPlayer final : public AFGCharacterBase, public IFGUseableInterface, public IFGRadiationInterface, public IFGActorRepresentationInterface
{
  /* This is the infamous build gun. */
  UPROPERTY( SaveGame, BlueprintReadOnly, Replicated, Category = "Equipment" )
  class AFGBuildGun* mBuildGun;

  /*Reference to the resource scanner */
  UPROPERTY( SaveGame, Replicated )
  AFGResourceScanner* mResourceScanner;

  /* Reference to the resource miner */
  UPROPERTY( SaveGame, Replicated )
  class AFGResourceMiner* mResourceMiner;

  /** latest safe ground location positions */
  UPROPERTY( SaveGame )
  FVector mLastSafeGroundPositions[ MAX_SAFE_GROUND_POS_BUFFER_SIZE ];

  /** used for knowing which is the latest written safe ground position */
  UPROPERTY( SaveGame )
  int32 mLastSafeGroundPositionLoopHead = 0;

  /** Basically just stores movement components bCheatFlying when we save the game so it can be applied when loading a game.
    * This is a pretty naive implementation but seems to work and has minimal effects on other systems.
    * DON'T RELY ON THIS AT RUNTIME. I don't feel its worth tracking this state during the whole session -K2 */
  UPROPERTY( SaveGame )
  bool mIsCheatFlyingSaved = false;

  /** The players inventory. */
  UPROPERTY( SaveGame, ReplicatedUsing=OnRep_PlayerInventory )
  class UFGInventoryComponent* mInventory;

  /** Arms equipment slot */
  UPROPERTY( SaveGame, ReplicatedUsing=OnRep_ArmsEquipmentSlot )
  UFGInventoryComponentEquipment* mArmsEquipmentSlot = nullptr;
  /** Back equipment slot */

  UPROPERTY( SaveGame, ReplicatedUsing=OnRep_BackEquipmentSlot )
  UFGInventoryComponentEquipment* mBackEquipmentSlot = nullptr;
  /** Legs equipment slot */

  UPROPERTY( SaveGame, ReplicatedUsing=OnRep_LegsEquipmentSlot )
  UFGInventoryComponentEquipment* mLegsEquipmentSlot = nullptr;
  /** Head equipment slot */

  UPROPERTY( SaveGame, ReplicatedUsing=OnRep_HeadEquipmentSlot )
  UFGInventoryComponentEquipment* mHeadEquipmentSlot = nullptr;
  /** Body equipment slot */

  UPROPERTY( SaveGame, ReplicatedUsing=OnRep_BodyEquipmentSlot )
  UFGInventoryComponentEquipment* mBodyEquipmentSlot  = nullptr;

  /**
   * Saved vehicle currently driven by pawn.
   * Used by server to remember which vehicle we drove when saving.
   * Used by client to remember which vehicle we drove when leaving the vehicle.
   */
  UPROPERTY( SaveGame )
  class AFGDriveablePawn* mSavedDrivenVehicle;

  /** The indexed of the holstered hand equipment, if we have any. Replicated for UI use */
  UPROPERTY( SaveGame, Replicated )
  int32 mHolsteredEquipmentIndex = INDEX_NONE;

  /** The player name of the last logged in player that possessed this pawn */
  UPROPERTY( SaveGame, Replicated )
  FString mCachedPlayerName;
}

class FACTORYGAME_API AFGPassengerSeat : public AFGDriveablePawn
{
  /** Instance of the vehicle this passenger seat belongs to */
  UPROPERTY( SaveGame, Replicated )
  class AFGVehicle* mOuterVehicle;
}

class FACTORYGAME_API AFGVehicle : public AFGDriveablePawn, public IFGUseableInterface, public IFGDismantleInterface, public IFGDockableInterface, public IFGColorInterface, public IFGSignificanceInterface
{
  /** Keeps track of our current health */
  UPROPERTY( SaveGame, Replicated, VisibleAnywhere, Category = "Health" )
  class UFGHealthComponent* mHealthComponent;

  /** Custom Color/Mat data. Stored in a TArray so it can be variable (or 0 size) to reduce save footprint since many buildings will only utilize the slot index */
  UPROPERTY( SaveGame, ReplicatedUsing = OnRep_CustomColorData )
  FFactoryCustomizationData mCustomizationData;

  /** Recipe this vehicle was built with, e.g. used for refunds and stats. */
  UPROPERTY( SaveGame, Replicated )
  TSubclassOf< class UFGRecipe > mBuiltWithRecipe;

  /** Is the movement being simulated? */
  UPROPERTY( ReplicatedUsing = OnRep_IsSimulated, SaveGame )
  bool mIsSimulated;
}

class FACTORYGAME_API UFGDroneAction_TraversePath : public UFGDroneAction
{
  UPROPERTY( SaveGame )
  TArray< FVector > mPath;

  UPROPERTY( SaveGame )
  EDroneFlyingMode mFlyingMode;

  UPROPERTY( SaveGame )
  bool mStopAtDestination;
}

class FACTORYGAME_API UFGDroneAction_RequestDocking : public UFGDroneAction
{
  UPROPERTY( SaveGame )
  class AFGBuildableDroneStation* mStation;

  UPROPERTY( SaveGame )
  EDroneDockingRequestState mCurrentState;

  UPROPERTY( SaveGame )
  bool mShouldTransferItems;

  UPROPERTY( SaveGame )
  float mTotalQueueTime;

  UPROPERTY( SaveGame )
  int mQueuePosition;
}

```
