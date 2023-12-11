export interface Generic_Class {
    'ClassName': string;
}
export interface Generic_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.Generic'";
    Classes: Generic_Class[];
}
export interface FGRecipe_Class extends Generic_Class {
    'FullName': string;
    'mDisplayName': string;
    'mIngredients': string;
    'mProduct': string;
    'mManufacturingMenuPriority': number;
    'mManufactoringDuration': number;
    'mManualManufacturingMultiplier': number;
    'mProducedIn': string;
    'mRelevantEvents': number;
    'mVariablePowerConsumptionConstant': number;
    'mVariablePowerConsumptionFactor': number;
}
export interface FGRecipe_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGRecipe'";
    Classes: FGRecipe_Class[];
}
export interface FGCustomizationRecipe_Class extends FGRecipe_Class {
}
export interface FGCustomizationRecipe_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGCustomizationRecipe'";
    Classes: FGCustomizationRecipe_Class[];
}
export interface FGJumpingStilts_Class extends Generic_Class {
    'mSprintSpeedFactor': number;
    'mJumpSpeedFactor': number;
    'mEquipmentSlot': string;
    'mAttachSocket': string;
    'mComponentNameToFirstPersonMaterials': string;
    'mNeedsDefaultEquipmentMappingContext': boolean;
    'mCostToUse': number;
    'mArmAnimation': string;
    'mBackAnimation': string;
    'mHasPersistentOwner': boolean;
    'mOnlyVisibleToOwner': boolean;
    'mDefaultEquipmentActions': number;
    'mReceivedDamageModifiers': number;
    'mSwappedOutThirdPersonMaterials': string;
}
export interface FGJumpingStilts_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGJumpingStilts'";
    Classes: FGJumpingStilts_Class[];
}
export interface FGPortableMinerDispenser_Class extends Generic_Class {
    'mAllowedResourceForms': string;
    'mPlaceDistanceMax': number;
    'mEquipmentSlot': string;
    'mAttachSocket': string;
    'mComponentNameToFirstPersonMaterials': string;
    'mNeedsDefaultEquipmentMappingContext': boolean;
    'mCostToUse': number;
    'mArmAnimation': string;
    'mBackAnimation': string;
    'mHasPersistentOwner': boolean;
    'mOnlyVisibleToOwner': boolean;
    'mDefaultEquipmentActions': number;
    'mReceivedDamageModifiers': number;
    'mSwappedOutThirdPersonMaterials': string;
}
export interface FGPortableMinerDispenser_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGPortableMinerDispenser'";
    Classes: FGPortableMinerDispenser_Class[];
}
export interface FGParachute_Class extends Generic_Class {
    'ArmEquipmentsToSkipAnim': string;
    'DeployedVFXComponents': number;
    'mUseDistanceOverride': number;
    'mIsDeployed': boolean;
    'mEquipmentSlot': string;
    'mAttachSocket': string;
    'mComponentNameToFirstPersonMaterials': string;
    'mNeedsDefaultEquipmentMappingContext': boolean;
    'mCostToUse': string;
    'mArmAnimation': string;
    'mBackAnimation': string;
    'mHasPersistentOwner': boolean;
    'mOnlyVisibleToOwner': boolean;
    'mDefaultEquipmentActions': number;
    'mReceivedDamageModifiers': number;
    'mSwappedOutThirdPersonMaterials': string;
}
export interface FGParachute_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGParachute'";
    Classes: FGParachute_Class[];
}
export interface FGConsumableEquipment_Class extends Generic_Class {
    'mEquipmentSlot': string;
    'mAttachSocket': string;
    'mComponentNameToFirstPersonMaterials': string;
    'mNeedsDefaultEquipmentMappingContext': boolean;
    'mCostToUse': number;
    'mArmAnimation': string;
    'mBackAnimation': string;
    'mHasPersistentOwner': boolean;
    'mOnlyVisibleToOwner': boolean;
    'mDefaultEquipmentActions': number;
    'mReceivedDamageModifiers': number;
    'mSwappedOutThirdPersonMaterials': string;
    'mRandomAnim'?: number;
    'mCanPress'?: boolean;
    'mAnimData'?: string;
    'mCurrentAnimData'?: string;
}
export interface FGConsumableEquipment_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGConsumableEquipment'";
    Classes: FGConsumableEquipment_Class[];
}
export interface FGGolfCartDispenser_Class extends Generic_Class {
    'mMaxSpawnDistance': number;
    'mSpawningClearance': number;
    'mBuildDisqualifierText': string;
    'canDisplayDisqualifier': boolean;
    'mPlaceDistanceMax': number;
    'mEquipmentSlot': string;
    'mAttachSocket': string;
    'mComponentNameToFirstPersonMaterials': string;
    'mNeedsDefaultEquipmentMappingContext': boolean;
    'mCostToUse': number;
    'mArmAnimation': string;
    'mBackAnimation': string;
    'mHasPersistentOwner': boolean;
    'mOnlyVisibleToOwner': boolean;
    'mDefaultEquipmentActions': number;
    'mReceivedDamageModifiers': number;
    'mSwappedOutThirdPersonMaterials': string;
}
export interface FGGolfCartDispenser_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGGolfCartDispenser'";
    Classes: FGGolfCartDispenser_Class[];
}
export interface FGGasMask_Class extends Generic_Class {
    'mDamageTypesToProtectAgainst': string;
    'mPostProcessEnabled': boolean;
    'mFilterCountdown': number;
    'mFilterDuration': number;
    'mIsInPoisonGas': boolean;
    'mEquipmentSlot': string;
    'mAttachSocket': string;
    'mComponentNameToFirstPersonMaterials': string;
    'mNeedsDefaultEquipmentMappingContext': boolean;
    'mCostToUse': string;
    'mArmAnimation': string;
    'mBackAnimation': string;
    'mHasPersistentOwner': boolean;
    'mOnlyVisibleToOwner': boolean;
    'mDefaultEquipmentActions': number;
    'mReceivedDamageModifiers': number;
    'mSwappedOutThirdPersonMaterials': string;
}
export interface FGGasMask_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGGasMask'";
    Classes: FGGasMask_Class[];
}
export interface FGEquipmentStunSpear_Class extends Generic_Class {
    'mPunchAnimationWeight': number;
    'mDamageTypes': string;
    'mSecondSwingMaxTime': number;
    'mSecondSwingCooldDownTime': number;
    'mAttackDistance': number;
    'mAttackSweepRadius': number;
    'mEquipmentSlot': string;
    'mAttachSocket': string;
    'mComponentNameToFirstPersonMaterials': string;
    'mNeedsDefaultEquipmentMappingContext': boolean;
    'mCostToUse': number;
    'mArmAnimation': string;
    'mBackAnimation': string;
    'mHasPersistentOwner': boolean;
    'mOnlyVisibleToOwner': boolean;
    'mDefaultEquipmentActions': number;
    'mReceivedDamageModifiers': number;
    'mSwappedOutThirdPersonMaterials': string;
    'mRandomAttackAnim'?: number;
    'mRandomEquipAnim'?: number;
}
export interface FGEquipmentStunSpear_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGEquipmentStunSpear'";
    Classes: FGEquipmentStunSpear_Class[];
}
export interface FGEquipmentZipline_Class extends Generic_Class {
    'mShouldPlayDeactivateSound': boolean;
    'mZiplineJumpLaunchVelocity': number;
    'mMaxZiplineAngle': number;
    'mTraceDistance': number;
    'mTraceStartOffset': number;
    'mTraceRadius': number;
    'mVisualizeTraceDistance': boolean;
    'mActiveNoiseFrequency': number;
    'mZiplineReattachCooldown': number;
    'mEquipmentSlot': string;
    'mAttachSocket': string;
    'mComponentNameToFirstPersonMaterials': string;
    'mNeedsDefaultEquipmentMappingContext': boolean;
    'mCostToUse': number;
    'mArmAnimation': string;
    'mBackAnimation': string;
    'mHasPersistentOwner': boolean;
    'mOnlyVisibleToOwner': boolean;
    'mDefaultEquipmentActions': number;
    'mReceivedDamageModifiers': number;
    'mSwappedOutThirdPersonMaterials': string;
}
export interface FGEquipmentZipline_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGEquipmentZipline'";
    Classes: FGEquipmentZipline_Class[];
}
export interface FGSuitBase_Class extends Generic_Class {
    'mImmunity': number;
    'mIsWorking': boolean;
    'mHasNegatedDamage': boolean;
    'mDamageNegated': number;
    'mFilterDuration': number;
    'mCountdown': number;
    'mDisableEffectTimer': number;
    'mIsBurningFuel': boolean;
    'mSuit1PMeshMaterials': string;
    'mEquipmentSlot': string;
    'mAttachSocket': string;
    'mComponentNameToFirstPersonMaterials': string;
    'mNeedsDefaultEquipmentMappingContext': boolean;
    'mCostToUse': string;
    'mArmAnimation': string;
    'mBackAnimation': string;
    'mHasPersistentOwner': boolean;
    'mOnlyVisibleToOwner': boolean;
    'mDefaultEquipmentActions': number;
    'mReceivedDamageModifiers': number;
    'mSwappedOutThirdPersonMaterials': string;
}
export interface FGSuitBase_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGSuitBase'";
    Classes: FGSuitBase_Class[];
}
export interface FGPoleDescriptor_Class extends Generic_Class {
    'mDisplayName': number;
    'mDescription': number;
    'mAbbreviatedDisplayName': number;
    'mStackSize': string;
    'mCanBeDiscarded': boolean;
    'mRememberPickUp': boolean;
    'mEnergyValue': number;
    'mRadioactiveDecay': number;
    'mForm': string;
    'mSmallIcon': string;
    'mPersistentBigIcon': string;
    'mCrosshairMaterial': string;
    'mDescriptorStatBars': number;
    'mSubCategories': string;
    'mMenuPriority': number;
    'mFluidColor': string;
    'mGasColor': string;
    'mCompatibleItemDescriptors': number;
    'mClassToScanFor': string;
    'mScannableType': string;
    'mShouldOverrideScannerDisplayText': boolean;
    'mScannerDisplayText': number;
    'mScannerLightColor': string;
}
export interface FGPoleDescriptor_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGPoleDescriptor'";
    Classes: FGPoleDescriptor_Class[];
}
export interface FGBuildingDescriptor_Class extends FGPoleDescriptor_Class {
}
export interface FGBuildingDescriptor_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildingDescriptor'";
    Classes: FGBuildingDescriptor_Class[];
}
export interface FGItemDescriptorBiomass_Class extends FGBuildingDescriptor_Class {
    'mResourceSinkPoints': number;
}
export interface FGItemDescriptorBiomass_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGItemDescriptorBiomass'";
    Classes: FGItemDescriptorBiomass_Class[];
}
export interface FGEquipmentDescriptor_Class extends FGItemDescriptorBiomass_Class {
}
export interface FGEquipmentDescriptor_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGEquipmentDescriptor'";
    Classes: FGEquipmentDescriptor_Class[];
}
export interface FGSchematic_Class extends Generic_Class {
    'FullName': string;
    'mType': string;
    'mDisplayName': string;
    'mDescription': number;
    'mSubCategories': number;
    'mMenuPriority': number;
    'mTechTier': number;
    'mCost': number;
    'mTimeToComplete': number;
    'mRelevantShopSchematics': number;
    'mIsPlayerSpecific': boolean;
    'mUnlocks': {
        Class: string;
        mEmotes: string;
    }[];
    'mSchematicIcon': string;
    'mSmallSchematicIcon': string;
    'mSchematicDependencies': undefined[];
    'mDependenciesBlocksSchematicAccess': boolean;
    'mHiddenUntilDependenciesMet': boolean;
    'mRelevantEvents': string;
    'mIncludeInBuilds': string;
    'mUnlockName'?: string;
    'mUnlockDescription'?: number;
    'mUnlockIconBig'?: string;
    'mUnlockIconSmall'?: string;
    'mUnlockIconCategory'?: string;
}
export interface FGSchematic_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGSchematic'";
    Classes: FGSchematic_Class[];
}
export interface FGItemDescriptor_Class extends FGEquipmentDescriptor_Class {
}
export interface FGItemDescriptor_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGItemDescriptor'";
    Classes: FGItemDescriptor_Class[];
}
export interface FGChainsaw_Class extends Generic_Class {
    'mSawingMontageLength': number;
    'mInterpSawProgress': number;
    'mCurrentOutputDataSFX': number;
    'mCurrentAkID': number;
    'mCurrentHasFuel': boolean;
    'mPreviousState': string;
    'mEnergyConsumption': number;
    'mSawDownTreeTime': number;
    'mCollateralPickupRadius': number;
    'mExcludeChainsawableFoliage': boolean;
    'mEnergyStored': number;
    'mSawingProgress': number;
    'mChainsawState': string;
    'mEquipmentSlot': string;
    'mAttachSocket': string;
    'mComponentNameToFirstPersonMaterials': string;
    'mNeedsDefaultEquipmentMappingContext': boolean;
    'mCostToUse': number;
    'mArmAnimation': string;
    'mBackAnimation': string;
    'mHasPersistentOwner': boolean;
    'mOnlyVisibleToOwner': boolean;
    'mDefaultEquipmentActions': number;
    'mReceivedDamageModifiers': number;
    'mSwappedOutThirdPersonMaterials': string;
}
export interface FGChainsaw_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGChainsaw'";
    Classes: FGChainsaw_Class[];
}
export interface FGJetPack_Class extends Generic_Class {
    'FuelTypeDescriptos': number;
    'mOnFuelAmountChanged': string;
    'mOnBurnPercentChanged': string;
    'mOnFuelTypeChanged': string;
    'mDefaultAirControl': number;
    'mRTPCInterval': number;
    'mThrustCooldown': number;
    'mCurrentFuel': number;
    'mIsThrusting': boolean;
    'mFuelTypes': string;
    'mSelectedFuelType': number;
    'mCurrentFuelType': number;
    'mActiveNoiseFrequency': number;
    'mEquipmentSlot': string;
    'mAttachSocket': string;
    'mComponentNameToFirstPersonMaterials': string;
    'mNeedsDefaultEquipmentMappingContext': boolean;
    'mCostToUse': string;
    'mArmAnimation': string;
    'mBackAnimation': string;
    'mHasPersistentOwner': boolean;
    'mOnlyVisibleToOwner': boolean;
    'mDefaultEquipmentActions': number;
    'mReceivedDamageModifiers': number;
    'mSwappedOutThirdPersonMaterials': string;
}
export interface FGJetPack_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGJetPack'";
    Classes: FGJetPack_Class[];
}
export interface FGObjectScanner_Class extends Generic_Class {
    'mPlayingSound': boolean;
    'mScreenUpdateTimer': string;
    'mScanlineLerpT': number;
    'mScreenUpdateTime': number;
    'mNormalizedCloesnessToObject': number;
    'mObjectIsWithinRange': boolean;
    'mIsPlayingStaticSound': boolean;
    'mBeepDelayMax': number;
    'mBeepDelayMin': number;
    'mDetectionRange': number;
    'mUpdateClosestObjectTime': number;
    'mClosestObjectInScanRange': boolean;
    'mNormalizedDistanceToClosestObject': number;
    'mAngleToClosestObject': number;
    'mEquipmentSlot': string;
    'mAttachSocket': string;
    'mComponentNameToFirstPersonMaterials': string;
    'mNeedsDefaultEquipmentMappingContext': boolean;
    'mCostToUse': number;
    'mArmAnimation': string;
    'mBackAnimation': string;
    'mHasPersistentOwner': boolean;
    'mOnlyVisibleToOwner': boolean;
    'mDefaultEquipmentActions': number;
    'mReceivedDamageModifiers': number;
    'mSwappedOutThirdPersonMaterials': string;
}
export interface FGObjectScanner_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGObjectScanner'";
    Classes: FGObjectScanner_Class[];
}
export interface FGVehicleDescriptor_Class extends FGBuildingDescriptor_Class {
    'mFuelConsumption': number;
    'mInventorySize': number;
    'mPowerConsumption'?: string;
}
export interface FGVehicleDescriptor_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGVehicleDescriptor'";
    Classes: FGVehicleDescriptor_Class[];
}
export interface FGItemDescriptorNuclearFuel_Class extends FGItemDescriptor_Class {
    'mSpentFuelClass': string;
    'mAmountOfWaste': number;
}
export interface FGItemDescriptorNuclearFuel_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGItemDescriptorNuclearFuel'";
    Classes: FGItemDescriptorNuclearFuel_Class[];
}
export interface FGBuildableFactoryBuilding_Class extends Generic_Class {
    'mDisplayName': string;
    'mDescription': string;
    'MaxRenderDistance': number;
    'mAlternativeMaterialRecipes': number;
    'mContainsComponents': boolean;
    'mIsConsideredForBaseWeightValue': number;
    'mBuildEffectSpeed': number;
    'mAllowColoring': boolean;
    'mAllowPatterning': boolean;
    'mSkipBuildEffect': boolean;
    'mForceNetUpdateOnRegisterPlayer': boolean;
    'mToggleDormancyOnInteraction': boolean;
    'mIsMultiSpawnedBuildable': boolean;
    'mShouldShowAttachmentPointVisuals': boolean;
    'mCreateClearanceMeshRepresentation': boolean;
    'mCanContainLightweightInstances': boolean;
    'mAffectsOcclusion': boolean;
    'mOcclusionShape': string;
    'mScaleCustomOffset': number;
    'mCustomScaleType': string;
    'mOcclusionBoxInfo': number;
    'mAttachmentPoints': number;
    'mInteractingPlayers': number;
    'mIsUseable': boolean;
    'mHideOnBuildEffectStart': boolean;
    'mShouldModifyWorldGrid': boolean;
    'mBlueprintBuildEffectID': number;
}
export interface FGBuildableFactoryBuilding_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFactoryBuilding'";
    Classes: FGBuildableFactoryBuilding_Class[];
}
export interface FGBuildableSnowDispenser_Class extends FGBuildableFactoryBuilding_Class {
}
export interface FGBuildableSnowDispenser_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableSnowDispenser'";
    Classes: FGBuildableSnowDispenser_Class[];
}
export interface FGBuildableAttachmentSplitter_Class extends FGBuildableSnowDispenser_Class {
    'mCurrentOutputIndex': number;
}
export interface FGBuildableAttachmentSplitter_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableAttachmentSplitter'";
    Classes: FGBuildableAttachmentSplitter_Class[];
}
export interface FGBuildableAttachmentMerger_Class extends FGBuildableSnowDispenser_Class {
    'mCurrentInputIndex': number;
}
export interface FGBuildableAttachmentMerger_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableAttachmentMerger'";
    Classes: FGBuildableAttachmentMerger_Class[];
}
export interface FGConsumableDescriptor_Class extends FGItemDescriptor_Class {
    'mCustomHandsMeshScale': number;
    'mCustomRotation': string;
    'mCustomLocation': string;
    'mHealthGain'?: number;
}
export interface FGConsumableDescriptor_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGConsumableDescriptor'";
    Classes: FGConsumableDescriptor_Class[];
}
export interface FGResourceDescriptor_Class extends FGItemDescriptor_Class {
    'mDecalSize': number;
    'mPingColor': string;
    'mCollectSpeedMultiplier': number;
    'mManualMiningAudioName': string;
}
export interface FGResourceDescriptor_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGResourceDescriptor'";
    Classes: FGResourceDescriptor_Class[];
}
export interface FGBuildablePillarLightweight_Class extends FGBuildableSnowDispenser_Class {
    'mSize': string;
    'mIsSupport': boolean;
}
export interface FGBuildablePillarLightweight_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePillarLightweight'";
    Classes: FGBuildablePillarLightweight_Class[];
}
export interface FGBuildable_Class extends FGBuildableSnowDispenser_Class {
    'mOccupiedText'?: string;
    'Tier'?: number;
}
export interface FGBuildable_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildable'";
    Classes: FGBuildable_Class[];
}
export interface FGBuildableStair_Class extends FGBuildableSnowDispenser_Class {
    'mStairDirection': string;
    'mHeight': number;
    'mSize': number;
}
export interface FGBuildableStair_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableStair'";
    Classes: FGBuildableStair_Class[];
}
export interface FGBuildableMAM_Class extends FGBuildableSnowDispenser_Class {
    'mOccupiedText': string;
    'mCurrentResearchState': string;
    'mSignificanceRange': number;
}
export interface FGBuildableMAM_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableMAM'";
    Classes: FGBuildableMAM_Class[];
}
export interface FGBuildablePipeHyper_Class extends FGBuildableSnowDispenser_Class {
    'mMeshLength': number;
    'mSplineData': number;
    'mSnappedPassthroughs': number;
}
export interface FGBuildablePipeHyper_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePipeHyper'";
    Classes: FGBuildablePipeHyper_Class[];
}
export interface FGBuildableWalkway_Class extends FGBuildableSnowDispenser_Class {
    'mSize': number;
    'mElevation': number;
    'mDisableSnapOn': string;
}
export interface FGBuildableWalkway_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableWalkway'";
    Classes: FGBuildableWalkway_Class[];
}
export interface FGBuildableWalkwayLightweight_Class extends FGBuildableWalkway_Class {
}
export interface FGBuildableWalkwayLightweight_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableWalkwayLightweight'";
    Classes: FGBuildableWalkwayLightweight_Class[];
}
export interface FGBuildableCornerWall_Class extends FGBuildableSnowDispenser_Class {
    'mSize': number;
    'mHeight': number;
    'mIsInverted': boolean;
}
export interface FGBuildableCornerWall_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableCornerWall'";
    Classes: FGBuildableCornerWall_Class[];
}
export interface FGBuildableBeamLightweight_Class extends FGBuildableSnowDispenser_Class {
    'mSize': number;
    'mDefaultLength': number;
    'mMaxLength': number;
    'mLength': number;
}
export interface FGBuildableBeamLightweight_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableBeamLightweight'";
    Classes: FGBuildableBeamLightweight_Class[];
}
export interface FGBuildablePowerPole_Class extends FGBuildableSnowDispenser_Class {
    'mPowerConnections': number;
    'mPowerPoleType': string;
    'mPowerTowerWireMaxLength': number;
    'mHasPower': boolean;
}
export interface FGBuildablePowerPole_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePowerPole'";
    Classes: FGBuildablePowerPole_Class[];
}
export interface FGBuildableLadder_Class extends FGBuildableSnowDispenser_Class {
    'mWidth': number;
    'mMeshHeight': number;
    'mMaxSegmentCount': number;
    'mNumSegments': number;
    'mLadderMeshes': number;
}
export interface FGBuildableLadder_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableLadder'";
    Classes: FGBuildableLadder_Class[];
}
export interface FGConveyorPoleStackable_Class extends FGBuildableSnowDispenser_Class {
    'mHeight': number;
    'mSelectedPoleVersion': number;
    'mUseStaticHeight': boolean;
    'mCanStack': boolean;
    'mStackHeight': number;
}
export interface FGConveyorPoleStackable_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGConveyorPoleStackable'";
    Classes: FGConveyorPoleStackable_Class[];
}
export interface FGBuildablePipelineSupport_Class extends FGBuildableSnowDispenser_Class {
    'mLength': number;
    'mVerticalAngle': number;
    'mUseStaticHeight': boolean;
    'mCanStack': boolean;
    'mStackHeight': number;
}
export interface FGBuildablePipelineSupport_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePipelineSupport'";
    Classes: FGBuildablePipelineSupport_Class[];
}
export interface FGBuildablePoleLightweight_Class extends FGConveyorPoleStackable_Class {
}
export interface FGBuildablePoleLightweight_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePoleLightweight'";
    Classes: FGBuildablePoleLightweight_Class[];
}
export interface FGBuildableWall_Class extends FGBuildableSnowDispenser_Class {
    'mWidth': number;
    'mHeight': number;
    'mElevation': number;
    'mAngularDepth': number;
    'mWallType': string;
    'mAngledVariants': number;
}
export interface FGBuildableWall_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableWall'";
    Classes: FGBuildableWall_Class[];
}
export interface FGBuildableWallLightweight_Class extends FGBuildableWall_Class {
}
export interface FGBuildableWallLightweight_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableWallLightweight'";
    Classes: FGBuildableWallLightweight_Class[];
}
export interface FGBuildableFloodlight_Class extends FGBuildableSnowDispenser_Class {
    'mFixtureAngle': number;
    'OnBuildableLightSourceStateChanged': string;
    'mIsEnabled': boolean;
    'mLightControlData': string;
    'mPowerConsumption': number;
    'mHasPower': boolean;
    'mIsDay': boolean;
}
export interface FGBuildableFloodlight_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFloodlight'";
    Classes: FGBuildableFloodlight_Class[];
}
export interface FGBuildableLightSource_Class extends FGBuildableSnowDispenser_Class {
    'newCustomizationData': string;
    'OnBuildableLightSourceStateChanged': string;
    'mIsEnabled': boolean;
    'mLightControlData': string;
    'mPowerConsumption': number;
    'mHasPower': boolean;
    'mIsDay': boolean;
}
export interface FGBuildableLightSource_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableLightSource'";
    Classes: FGBuildableLightSource_Class[];
}
export interface FGBuildableFoundationLightweight_Class extends FGBuildableSnowDispenser_Class {
    'mWidth': number;
    'mDepth': number;
    'mHeight': number;
    'mElevation': number;
    'mIsFrame': boolean;
    'mDisableSnapOn': string;
    'mDisableAttachmentSnapOn': string;
}
export interface FGBuildableFoundationLightweight_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFoundationLightweight'";
    Classes: FGBuildableFoundationLightweight_Class[];
}
export interface FGBuildableFoundation_Class extends FGBuildableFoundationLightweight_Class {
}
export interface FGBuildableFoundation_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFoundation'";
    Classes: FGBuildableFoundation_Class[];
}
export interface FGBuildableWire_Class extends FGBuildableSnowDispenser_Class {
    'mMaxLength': number;
    'mMaxPowerTowerLength': number;
    'mLengthPerCost': number;
    'mConnections': string;
    'mConnectionLocations': string;
    'mWireInstances': number;
    'mCachedLength': number;
}
export interface FGBuildableWire_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableWire'";
    Classes: FGBuildableWire_Class[];
}
export interface FGBuildableConveyorBelt_Class extends FGBuildableSnowDispenser_Class {
    'mCustomSkins': string;
    'mMeshLength': number;
    'mItemMeshMap': string;
    'mSplineData': number;
    'mSpeed': number;
    'mItems': string;
    'mConveyorChainFlags': number;
}
export interface FGBuildableConveyorBelt_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableConveyorBelt'";
    Classes: FGBuildableConveyorBelt_Class[];
}
export interface FGBuildableLightsControlPanel_Class extends FGBuildableSnowDispenser_Class {
    'OnLightControlPanelStateChanged': string;
    'mLightControlData': string;
    'mIsEnabled': boolean;
    'mOnControlledBuildablesChanged': string;
    'mControlledBuildables': number;
    'mOnCircuitsChanged': string;
    'mIsBridgeConnected': boolean;
    'mConnections': number;
}
export interface FGBuildableLightsControlPanel_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableLightsControlPanel'";
    Classes: FGBuildableLightsControlPanel_Class[];
}
export interface FGBuildableSplitterSmart_Class extends FGBuildableAttachmentSplitter_Class {
    'OnSortRulesChangedDelegate': string;
    'mMaxNumSortRules': number;
    'mLastItem': string;
    'mItemToLastOutputMap': string;
    'mLastOutputIndex': number;
    'mCurrentInventoryIndex': number;
    'mDistributionTable': number;
}
export interface FGBuildableSplitterSmart_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableSplitterSmart'";
    Classes: FGBuildableSplitterSmart_Class[];
}
export interface FGBuildableConveyorLift_Class extends FGBuildableSnowDispenser_Class {
    'mMeshHeight': number;
    'mTopTransform': string;
    'mIsReversed': boolean;
    'mItemMeshMap': string;
    'mSnappedPassthroughs': number;
    'mSpeed': number;
    'mItems': string;
    'mConveyorChainFlags': number;
}
export interface FGBuildableConveyorLift_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableConveyorLift'";
    Classes: FGBuildableConveyorLift_Class[];
}
export interface FGBuildableRamp_Class extends FGBuildableFoundation_Class {
    'mIsDoubleRamp': boolean;
    'mIsRoof': boolean;
}
export interface FGBuildableRamp_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableRamp'";
    Classes: FGBuildableRamp_Class[];
}
export interface FGBuildablePassthroughPipeHyper_Class extends FGBuildableSnowDispenser_Class {
    'mSnappedBuildingThickness': number;
    'mMidMeshLength': number;
    'mGenerateTunnelCollision': boolean;
    'mEndCapRotation': string;
    'mMidMeshRotation': string;
    'mEndCapTranslation': string;
    'mClearanceHeightMin': number;
    'mClearanceThickness': number;
    'mCostSegmentLength': number;
    'mGeneratedMeshComponents': number;
}
export interface FGBuildablePassthroughPipeHyper_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePassthroughPipeHyper'";
    Classes: FGBuildablePassthroughPipeHyper_Class[];
}
export interface FGBuildablePassthrough_Class extends FGBuildablePassthroughPipeHyper_Class {
}
export interface FGBuildablePassthrough_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePassthrough'";
    Classes: FGBuildablePassthrough_Class[];
}
export interface FGBuildableBlueprintDesigner_Class extends FGBuildableSnowDispenser_Class {
    'mTerminalDistanceFromEdge': number;
    'mTerminalHalfDepth': number;
    'mDimensions': string;
    'OnRecordDataChanged': string;
    'OnBlueprintCostChanged': string;
    'mCurrentCost': number;
    'mBuildables': number;
    'mIntersectComponents': number;
    'mCurrentRecordData': string;
    'mIsDismantlingAll': boolean;
}
export interface FGBuildableBlueprintDesigner_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableBlueprintDesigner'";
    Classes: FGBuildableBlueprintDesigner_Class[];
}
export interface FGBuildableCircuitSwitch_Class extends FGBuildableSnowDispenser_Class {
    'mTextRenderers': number;
    'bIsSignificant': boolean;
    'mMaxCharacters': number;
    'mOnIsSwitchOnChanged': string;
    'mOnIsConnectedChanged': string;
    'mOnBuildingTagChanged': string;
    'mIsSwitchOn': boolean;
    'mHasBuildingTag': boolean;
    'mBuildingTag': number;
    'mOnCircuitsChanged': string;
    'mIsBridgeConnected': boolean;
    'mConnections': number;
}
export interface FGBuildableCircuitSwitch_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableCircuitSwitch'";
    Classes: FGBuildableCircuitSwitch_Class[];
}
export interface FGBuildableRailroadSignal_Class extends FGBuildableSnowDispenser_Class {
    'mPreviousAspect': string;
    'mOnAspectChangedDelegate': string;
    'mOnBlockValidationChangedDelegate': string;
    'mDrawDebugVisualState': boolean;
    'mGuardedConnections': number;
    'mObservedConnections': number;
    'mAspect': string;
    'mBlockValidation': string;
    'mIsPathSignal': boolean;
    'mIsBiDirectional': boolean;
    'mVisualState': number;
    'mSignificanceRange': number;
}
export interface FGBuildableRailroadSignal_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableRailroadSignal'";
    Classes: FGBuildableRailroadSignal_Class[];
}
export interface FGBuildableRailroadTrack_Class extends FGBuildableSnowDispenser_Class {
    'mMeshLength': number;
    'mConnections': string;
    'mIsOwnedByPlatform': boolean;
    'mTrackGraphID': number;
    'mOverlappingTracks': number;
    'mVehicles': string;
    'mSignalBlockID': number;
    'mBlockVisualizationMeshLength': number;
    'mBlockVisualizationNumPrimitiveDataFloats': number;
    'mBlockVisualizationNumPerInstancePrimitiveDataCountOffset': number;
    'mBlockVisualizationSplineDataSettings': string;
    'mBlockVisualizationColorDataStartIndex': number;
}
export interface FGBuildableRailroadTrack_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableRailroadTrack'";
    Classes: FGBuildableRailroadTrack_Class[];
}
export interface FGChargedWeapon_Class extends Generic_Class {
    'mShowCycleAmmoRadialMenuTimer': string;
    'mRadialMenuShowUpTime': number;
    'mDispensedProjectiles': number;
    'mIsPendingExecuteFire': boolean;
    'mMaxChargeTime': number;
    'mMaxThrowForce': number;
    'mMinThrowForce': number;
    'mDelayBetweenSecondaryTriggers': number;
    'mOnWeaponStateChanged': string;
    'mWeaponState': string;
    'mAutomaticallyReload': boolean;
    'mAutoReloadDelay': number;
    'mAutoReloadTimerHandle': string;
    'mCurrentAmmoCount': number;
    'mAllowedAmmoClasses': string;
    'mAttachMagazineToPlayer': boolean;
    'mMuzzleSocketName': string;
    'mCurrentMagazineBoneName': string;
    'mEjectMagazineBoneName': string;
    'mDispersionOnNoMagazine': number;
    'mWeaponDamageMultiplier': number;
    'mFiringBlocksDispersionReduction': boolean;
    'mCurrentDispersion': number;
    'mReloadTime': number;
    'mAmmoSwitchUsedRadialMenu': boolean;
    'mOnAmmoCyclingPressed': string;
    'mOnAmmoCyclingReleased': string;
    'mBlockSprintWhenFiring': boolean;
    'mEquipmentSlot': string;
    'mAttachSocket': string;
    'mComponentNameToFirstPersonMaterials': string;
    'mNeedsDefaultEquipmentMappingContext': boolean;
    'mCostToUse': number;
    'mArmAnimation': string;
    'mBackAnimation': string;
    'mHasPersistentOwner': boolean;
    'mOnlyVisibleToOwner': boolean;
    'mDefaultEquipmentActions': number;
    'mReceivedDamageModifiers': number;
    'mSwappedOutThirdPersonMaterials': string;
}
export interface FGChargedWeapon_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGChargedWeapon'";
    Classes: FGChargedWeapon_Class[];
}
export interface FGWeapon_Class extends Generic_Class {
    'mMuteDryFire': boolean;
    'mRandomReloadAnim': number;
    'mRandomStingerAnim': number;
    'mRebarGunStingerID': number;
    'mRebarGunEquipID': number;
    'mShowCycleAmmoRadialMenuTimer': string;
    'mOnWeaponStateChanged': string;
    'mWeaponState': string;
    'mAutomaticallyReload': boolean;
    'mAutoReloadDelay': number;
    'mAutoReloadTimerHandle': string;
    'mCurrentAmmoCount': number;
    'mAllowedAmmoClasses': string;
    'mAttachMagazineToPlayer': boolean;
    'mMuzzleSocketName': string;
    'mCurrentMagazineBoneName': string;
    'mEjectMagazineBoneName': string;
    'mDispersionOnNoMagazine': number;
    'mWeaponDamageMultiplier': number;
    'mFiringBlocksDispersionReduction': boolean;
    'mCurrentDispersion': number;
    'mReloadTime': number;
    'mAmmoSwitchUsedRadialMenu': boolean;
    'mOnAmmoCyclingPressed': string;
    'mOnAmmoCyclingReleased': string;
    'mBlockSprintWhenFiring': boolean;
    'mEquipmentSlot': string;
    'mAttachSocket': string;
    'mComponentNameToFirstPersonMaterials': string;
    'mNeedsDefaultEquipmentMappingContext': boolean;
    'mCostToUse': number;
    'mArmAnimation': string;
    'mBackAnimation': string;
    'mHasPersistentOwner': boolean;
    'mOnlyVisibleToOwner': boolean;
    'mDefaultEquipmentActions': number;
    'mReceivedDamageModifiers': number;
    'mSwappedOutThirdPersonMaterials': string;
    'Fire'?: string;
    'mHasReloadedOnce'?: boolean;
}
export interface FGWeapon_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGWeapon'";
    Classes: FGWeapon_Class[];
}
export interface FGBuildablePriorityPowerSwitch_Class extends FGBuildableCircuitSwitch_Class {
    'mOnPriorityChanged': string;
    'mPriority': number;
}
export interface FGBuildablePriorityPowerSwitch_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePriorityPowerSwitch'";
    Classes: FGBuildablePriorityPowerSwitch_Class[];
}
export interface FGBuildableDoor_Class extends FGBuildableWallLightweight_Class {
    'IsDoorOpen': boolean;
    'mCanBeLocked': boolean;
    'mAnimationRate': number;
    'mMovementRate': number;
    'EasingFunction': string;
    'BlendExp': number;
    'Steps': number;
    'bigOverlapList'?: number;
}
export interface FGBuildableDoor_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableDoor'";
    Classes: FGBuildableDoor_Class[];
}
export interface FGHoverPack_Class extends Generic_Class {
    'mHoverPackActiveTimer': string;
    'mCurrentPlayerVelocity': number;
    'mCurrentMouseDelta': number;
    'mHoverpackJoystickTimer': string;
    'mCurrentBatteryPowerLevel': number;
    'm_PreviousHoverMode': string;
    'ConnectionLocationUpdatedDelegate': string;
    'ConnectionStatusUpdatedDelegate': string;
    'HoverModeChangedDelegate': string;
    'RangeWarningToggleDelegate': string;
    'mHoverSpeed': number;
    'mHoverAccelerationSpeed': number;
    'mHoverSprintMultiplier': number;
    'mHoverFriction': number;
    'mJumpKeyHoldActivationTime': number;
    'mFallSpeedLimitWhenPowered': number;
    'mPowerConnectionSearchRadius': number;
    'mPowerConnectionSearchTickRate': number;
    'mPowerConnectionDisconnectionTime': number;
    'mPowerCapacity': number;
    'mPowerDrainRate': number;
    'mPowerConsumption': number;
    'mCurrentPowerLevel': number;
    'mRangeWarningNormalizedDistanceThreshold': number;
    'mCurrentHoverMode': string;
    'mHasConnection': boolean;
    'mShouldAutomaticallyHoverWhenConnected': boolean;
    'mCrouchHoverCancelTime': number;
    'mCharacterUseDistanceWhenActive': number;
    'mActiveNoiseFrequency': number;
    'mCurrentConnectionLocation': string;
    'mEquipmentSlot': string;
    'mAttachSocket': string;
    'mComponentNameToFirstPersonMaterials': string;
    'mNeedsDefaultEquipmentMappingContext': boolean;
    'mCostToUse': number;
    'mArmAnimation': string;
    'mBackAnimation': string;
    'mHasPersistentOwner': boolean;
    'mOnlyVisibleToOwner': boolean;
    'mDefaultEquipmentActions': number;
    'mReceivedDamageModifiers': number;
    'mSwappedOutThirdPersonMaterials': string;
}
export interface FGHoverPack_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGHoverPack'";
    Classes: FGHoverPack_Class[];
}
export interface FGBuildableWidgetSign_Class extends FGBuildableSnowDispenser_Class {
    'mGainSignificanceDistance': number;
    'mTextElementToDataMap': string;
    'mIconElementToDataMap': string;
    'mSignDrawSize': string;
    'mPrefabTextElementSaveData': number;
    'mPrefabIconElementSaveData': number;
    'mForegroundColor': string;
    'mBackgroundColor': string;
    'mAuxilaryColor': string;
    'mEmissive': number;
    'mGlossiness': number;
    'mDataVersion': number;
    'mSignPoles': number;
    'mWorldDimensions': string;
    'mPoleOffset': string;
    'mPoleScale': string;
    'mSignToSignOffset': number;
}
export interface FGBuildableWidgetSign_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableWidgetSign'";
    Classes: FGBuildableWidgetSign_Class[];
}
export interface FGBuildablePipeline_Class extends FGBuildablePipeHyper_Class {
    'mRadius': number;
    'mFlowLimit': number;
    'mFlowIndicatorMinimumPipeLength': number;
    'mPipeConnections': number;
    'mFluidBox': string;
    'mIndicatorData': string;
    'mMaxIndicatorTurnAngle': number;
    'mIgnoreActorsForIndicator': number;
    'mFluidNames': string;
    'mCurrentFluid': number;
    'mLastContentForSound': number;
    'mLastFlowForSound': number;
    'mRattleLimit': number;
    'mIsRattling': boolean;
    'mUpdateSoundsHandle': string;
}
export interface FGBuildablePipeline_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePipeline'";
    Classes: FGBuildablePipeline_Class[];
}
export interface FGAmmoTypeInstantHit_Class extends FGItemDescriptor_Class {
    'Location': string;
    'Trail_Velocity': number;
    'mPlayFireEffects': boolean;
    'AmmoFiredDelegate': string;
    'mFiringTransform': string;
    'mFiringDirection': string;
    'mMagazineSize': number;
    'mMaxAmmoEffectiveRange': number;
    'mReloadTimeMultiplier': number;
    'mFireRate': number;
    'mFiringTransformIgnoresDispersion': boolean;
    'mDispersionFireRateMultiplier': number;
    'mDispersionPerShot': number;
    'mRestingDispersion': number;
    'mFiringDispersion': number;
    'mDispersionRecoveryTime': number;
    'mHasBeenInitialized': boolean;
    'mWeaponDamageMultiplier': number;
    'mMagazineMeshMaterials': string;
    'mMagazineMeshMaterials1p': string;
    'mDamageTypesOnImpact': string;
    'mAmmoDamageFalloff': string;
    'mMuzzleFlashScale': string;
    'mFiringSounds': string;
    'mFiringSounds1P': number;
    'mAmmoColor': string;
    'mAmmoScale': number;
    'mAmmoTickFunction': string;
}
export interface FGAmmoTypeInstantHit_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGAmmoTypeInstantHit'";
    Classes: FGAmmoTypeInstantHit_Class[];
}
export interface FGAmmoTypeSpreadshot_Class extends FGItemDescriptor_Class {
    'SpreadTrail_Velocity': number;
    'mNumShots': string;
    'mSpreadAngleDegrees': number;
    'AmmoFiredDelegate': string;
    'mFiringTransform': string;
    'mFiringDirection': string;
    'mMagazineSize': number;
    'mMaxAmmoEffectiveRange': number;
    'mReloadTimeMultiplier': number;
    'mFireRate': number;
    'mFiringTransformIgnoresDispersion': boolean;
    'mDispersionFireRateMultiplier': number;
    'mDispersionPerShot': number;
    'mRestingDispersion': number;
    'mFiringDispersion': number;
    'mDispersionRecoveryTime': number;
    'mHasBeenInitialized': boolean;
    'mWeaponDamageMultiplier': number;
    'mMagazineMeshMaterials': string;
    'mMagazineMeshMaterials1p': string;
    'mDamageTypesOnImpact': string;
    'mAmmoDamageFalloff': string;
    'mMuzzleFlashScale': string;
    'mFiringSounds': string;
    'mFiringSounds1P': number;
    'mAmmoColor': string;
    'mAmmoScale': number;
    'mAmmoTickFunction': string;
}
export interface FGAmmoTypeSpreadshot_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGAmmoTypeSpreadshot'";
    Classes: FGAmmoTypeSpreadshot_Class[];
}
export interface FGBuildableSpaceElevator_Class extends FGBuildableSnowDispenser_Class {
    'mPowerConsumption': number;
    'mPowerConsumptionExponent': number;
    'mDoesHaveShutdownAnimation': boolean;
    'mOnHasPowerChanged': string;
    'mOnHasProductionChanged': string;
    'mOnHasStandbyChanged': string;
    'mMinimumProducingTime': number;
    'mMinimumStoppedTime': number;
    'mCanEverMonitorProductivity': boolean;
    'mCanChangePotential': boolean;
    'mMinPotential': number;
    'mMaxPotential': number;
    'mMaxPotentialIncreasePerCrystal': number;
    'mFluidStackSizeDefault': string;
    'mFluidStackSizeMultiplier': number;
    'OnReplicationDetailActorCreatedEvent': string;
    'mInventoryPotentialHandlerData': string;
    'mEffectUpdateInterval': number;
    'mDefaultProductivityMeasurementDuration': number;
    'mLastProductivityMeasurementProduceDuration': number;
    'mLastProductivityMeasurementDuration': number;
    'mCurrentProductivityMeasurementProduceDuration': number;
    'mCurrentProductivityMeasurementDuration': number;
    'mProductivityMonitorEnabled': boolean;
    'mCachedSkeletalMeshes': number;
    'mAddToSignificanceManager': boolean;
    'mSignificanceRange': number;
    'mTickExponent': number;
}
export interface FGBuildableSpaceElevator_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableSpaceElevator'";
    Classes: FGBuildableSpaceElevator_Class[];
}
export interface FGBuildableResourceSinkShop_Class extends FGBuildableSpaceElevator_Class {
    'mShopInventoryDefaultSize': number;
}
export interface FGBuildableResourceSinkShop_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableResourceSinkShop'";
    Classes: FGBuildableResourceSinkShop_Class[];
}
export interface FGBuildableFactorySimpleProducer_Class extends FGBuildableSpaceElevator_Class {
    'mTimeToProduceItem': number;
    'mEventType': string;
}
export interface FGBuildableFactorySimpleProducer_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFactorySimpleProducer'";
    Classes: FGBuildableFactorySimpleProducer_Class[];
}
export interface FGBuildableRadarTower_Class extends FGBuildableSpaceElevator_Class {
    'mMapText': string;
    'mRevealRadius': number;
    'mScannableDescriptors': string;
}
export interface FGBuildableRadarTower_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableRadarTower'";
    Classes: FGBuildableRadarTower_Class[];
}
export interface FGBuildableStorage_Class extends FGBuildableSpaceElevator_Class {
    'mStackingHeight': number;
    'mInventorySizeX': number;
    'mInventorySizeY': number;
}
export interface FGBuildableStorage_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableStorage'";
    Classes: FGBuildableStorage_Class[];
}
export interface FGBuildablePipelineJunction_Class extends FGBuildableSpaceElevator_Class {
    'mRadius': number;
    'mFluidBoxVolume': number;
    'mFluidBox': string;
    'mPipeConnections': number;
}
export interface FGBuildablePipelineJunction_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePipelineJunction'";
    Classes: FGBuildablePipelineJunction_Class[];
}
export interface FGBuildableFactory_Class extends FGBuildableSpaceElevator_Class {
    'JumpForceCharacter': number;
    'JumpForcePhysics': number;
    'mDampeningFactor'?: number;
    'mPlayerList'?: number;
}
export interface FGBuildableFactory_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFactory'";
    Classes: FGBuildableFactory_Class[];
}
export interface FGBuildablePipeReservoir_Class extends FGBuildableSpaceElevator_Class {
    'mStackingHeight': number;
    'mFluidBox': string;
    'mStorageCapacity': number;
    'mPipeConnections': number;
    'mIndicatorData': string;
}
export interface FGBuildablePipeReservoir_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePipeReservoir'";
    Classes: FGBuildablePipeReservoir_Class[];
}
export interface FGBuildableTrainPlatformEmpty_Class extends FGBuildableSpaceElevator_Class {
    'mPlatformConnections': string;
    'mIsOrientationReversed': boolean;
    'mPlatformDockingStatus': string;
    'mSavedDockingStatus': string;
    'mDockingSequenceTimerHandle': string;
    'mIdleUpdateTimerHandle': string;
    'mDockWasCancelled': boolean;
}
export interface FGBuildableTrainPlatformEmpty_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableTrainPlatformEmpty'";
    Classes: FGBuildableTrainPlatformEmpty_Class[];
}
export interface FGBuildableResourceSink_Class extends FGBuildableSpaceElevator_Class {
    'IsAnimationProducing': boolean;
    'EnableTickGrinder': boolean;
    'EnableTickEngine': boolean;
    'mGrinderInterpDuration': number;
    'mEngineInterpDuration': number;
    'mCouponInventoryHandler': string;
    'mProcessingTime': number;
    'mProducingTimer': number;
}
export interface FGBuildableResourceSink_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableResourceSink'";
    Classes: FGBuildableResourceSink_Class[];
}
export interface FGBuildableGeneratorGeoThermal_Class extends FGBuildableSpaceElevator_Class {
    'mProductionEffectsRunning': boolean;
    'mVariablePowerProductionConstant': number;
    'mVariablePowerProductionFactor': number;
    'mVariablePowerProductionCycleLength': number;
    'mMinPowerProduction': number;
    'mMaxPowerProduction': number;
    'mVariablePowerProductionCycleOffset': number;
    'mPowerProduction': number;
    'mLoadPercentage': number;
}
export interface FGBuildableGeneratorGeoThermal_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableGeneratorGeoThermal'";
    Classes: FGBuildableGeneratorGeoThermal_Class[];
}
export interface FGBuildablePowerStorage_Class extends FGBuildableSpaceElevator_Class {
    'm_PreviousBatteryStatus': string;
    'mCurrentGameTimeSinceStateChange': number;
    'mActivationEventID': number;
    'mBatteryStatus': string;
    'mPowerStore': number;
    'mPowerStoreCapacity': number;
    'mPowerInputCapacity': number;
    'mIndicatorLevelMax': number;
    'mIndicatorLevel': number;
}
export interface FGBuildablePowerStorage_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePowerStorage'";
    Classes: FGBuildablePowerStorage_Class[];
}
export interface FGAmmoTypeProjectile_Class extends FGItemDescriptor_Class {
    'mInitialProjectileSpeedOverride': number;
    'mProjectileMaxSpeedOverride': number;
    'mProjectileHealthOverride': number;
    'mProjectileLifespan': number;
    'mProjectileStickspan': number;
    'mCanTakeDamageBySameProjectileOrChild': boolean;
    'mDamageTypesAtEndOfLife': string;
    'mGravityScaleOverLifespan': string;
    'mHomingProjectile': boolean;
    'mHomingNeedsValidTarget': boolean;
    'mMaxHomingAccelerationMagnitudeOverride': number;
    'mHomingMagnitudeMultiplierOverLifespan': string;
    'mHomingMagnitudeMultiplierOverDistanceToTarget': string;
    'mHomingOverlapSize': number;
    'mHomingAngleLimit': number;
    'mHomingOverrideTargets': number;
    'AmmoFiredDelegate': string;
    'mFiringTransform': string;
    'mFiringDirection': string;
    'mMagazineSize': number;
    'mMaxAmmoEffectiveRange': number;
    'mReloadTimeMultiplier': number;
    'mFireRate': number;
    'mFiringTransformIgnoresDispersion': boolean;
    'mDispersionFireRateMultiplier': number;
    'mDispersionPerShot': number;
    'mRestingDispersion': number;
    'mFiringDispersion': number;
    'mDispersionRecoveryTime': number;
    'mHasBeenInitialized': boolean;
    'mWeaponDamageMultiplier': number;
    'mMagazineMeshMaterials': string;
    'mMagazineMeshMaterials1p': string;
    'mDamageTypesOnImpact': string;
    'mAmmoDamageFalloff': string;
    'mMuzzleFlashScale': string;
    'mFiringSounds': number;
    'mFiringSounds1P': number;
    'mAmmoColor': string;
    'mAmmoScale': number;
    'mAmmoTickFunction': string;
}
export interface FGAmmoTypeProjectile_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGAmmoTypeProjectile'";
    Classes: FGAmmoTypeProjectile_Class[];
}
export interface FGPipeHyperStart_Class extends FGBuildableSpaceElevator_Class {
    'mWindDirectionFromTurbine': string;
    'mIsWindSoundPlaying?': boolean;
    'mAudioTimerCounter': number;
    'AudioCounterTimer': string;
    'IsEnginePlaying': boolean;
    'mOpeningOffset': number;
    'mInitialMinSpeedFactor': number;
    'mLength': number;
    'mCanStack': boolean;
    'mStackHeight': number;
    'mUseStaticHeight': boolean;
}
export interface FGPipeHyperStart_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGPipeHyperStart'";
    Classes: FGPipeHyperStart_Class[];
}
export interface FGBuildableFrackingExtractor_Class extends FGBuildableSpaceElevator_Class {
    'mExtractStartupTime': number;
    'mExtractStartupTimer': number;
    'mExtractCycleTime': number;
    'mItemsPerCycle': number;
    'mPipeOutputConnections': number;
    'mReplicatedFlowRate': number;
    'mAllowedResourceForms': string;
    'mOnlyAllowCertainResources': boolean;
    'mAllowedResources': string;
    'mExtractorTypeName': string;
    'mTryFindMissingResource': boolean;
}
export interface FGBuildableFrackingExtractor_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFrackingExtractor'";
    Classes: FGBuildableFrackingExtractor_Class[];
}
export interface FGBuildableRailroadStation_Class extends FGBuildableTrainPlatformEmpty_Class {
    'mMapText': string;
    'mShouldTeleportHere': boolean;
    'mDockedPlatformList': number;
    'mCurrentDockedWithRuleSet': string;
    'mCurrentDockForDuration': number;
}
export interface FGBuildableRailroadStation_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableRailroadStation'";
    Classes: FGBuildableRailroadStation_Class[];
}
export interface FGBuildableFrackingActivator_Class extends FGBuildableSpaceElevator_Class {
    'CurrentPotentialChangedDelegate': string;
    'ConnectedExtractorCountChangedDelegate': string;
    'mActivationStartupTime': number;
    'mActivationStartupTimer': number;
    'mSatelliteActivationComplete': boolean;
    'mSatelliteNodeCount': number;
    'mConnectedExtractorCount': number;
    'mDefaultPotentialExtractionPerMinute': number;
    'mAllowedResourceForms': string;
    'mOnlyAllowCertainResources': boolean;
    'mAllowedResources': string;
    'mExtractorTypeName': string;
    'mTryFindMissingResource': boolean;
}
export interface FGBuildableFrackingActivator_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFrackingActivator'";
    Classes: FGBuildableFrackingActivator_Class[];
}
export interface FGBuildableWaterPump_Class extends FGBuildableFrackingExtractor_Class {
    'mWaterpumpTimeline_RTPC_B8FA6F944E717E3B7A286E84901F620E': number;
    'mWaterpumpTimeline__Direction_B8FA6F944E717E3B7A286E84901F620E': string;
    'HasLostSignificance': boolean;
    'mMinimumDepthForPlacement': number;
    'mDepthTraceOriginOffset': string;
}
export interface FGBuildableWaterPump_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableWaterPump'";
    Classes: FGBuildableWaterPump_Class[];
}
export interface FGBuildableResourceExtractor_Class extends FGBuildableFrackingExtractor_Class {
    'mParticleMap'?: string;
    'mCanPlayAfterStartUpStopped'?: boolean;
    'mInternalMiningState_0'?: string;
    'mToggleMiningStateHandle_0'?: string;
    'mMinimumDrillTime_0'?: number;
    'mMaximumDrillTime_0'?: number;
    'CanPlayAfterStartUpStopped'?: boolean;
}
export interface FGBuildableResourceExtractor_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableResourceExtractor'";
    Classes: FGBuildableResourceExtractor_Class[];
}
export interface FGBuildableTradingPost_Class extends FGBuildableSpaceElevator_Class {
    'mWorkBenchOccupied': string;
    'mWorkBenchFree': string;
    'Meshes': string;
    'mShipUpgradeLevel': number;
    'mStorageText': string;
    'mMamFreeText': string;
    'mMamOccupiedText': string;
    'mMeshes': string;
    'ABClass': string;
    'mSkeletalMeshSoftPtr': string;
    'mGenerators': number;
    'mStorageInventorySize': number;
    'mStorageVisibilityLevel': number;
    'mSpawningGroundZOffset': number;
    'mGroundSearchZDistance': number;
    'mDefaultResources': number;
    'mNeedPlayingBuildEffectNotification': boolean;
    'mRepresentationText': string;
}
export interface FGBuildableTradingPost_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableTradingPost'";
    Classes: FGBuildableTradingPost_Class[];
}
export interface FGBuildableDockingStation_Class extends FGBuildableSpaceElevator_Class {
    'VehicleFuelConsumptionRateChangedDelegate': string;
    'ItemTransferRateChangedDelegate': string;
    'MaximumStackTransferRateChangedDelegate': string;
    'mDockPosition': string;
    'mMinimumDockingTime': number;
    'mStorageSizeX': number;
    'mStorageSizeY': number;
    'mFuelInventorySizeX': number;
    'mFuelInventorySizeY': number;
    'mTransferSpeed': number;
    'mFuelTransferSpeed': number;
    'mFuelInventoryHandlerData': string;
    'mInventoryHandlerData': string;
    'mStackTransferSize': number;
    'mForceSignificance': boolean;
    'mVehicleFuelConsumptionRate': number;
    'mItemTransferRate': number;
    'mMaximumStackTransferRate': number;
    'mDockingVehicleStatistics': string;
}
export interface FGBuildableDockingStation_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableDockingStation'";
    Classes: FGBuildableDockingStation_Class[];
}
export interface FGBuildableGeneratorNuclear_Class extends FGBuildableSpaceElevator_Class {
    'mCachedLoadPercentage': number;
    'mOutputInventoryHandlerData': string;
    'mWasteLeftFromCurrentFuel': number;
    'mCurrentGeneratorNuclearWarning': string;
    'mFuelInventoryHandlerData': string;
    'mFuelClasses': number;
    'mDefaultFuelClasses': string;
    'mFuel': {
        mFuelClass: string;
        mSupplementalResourceClass: string;
        mByproduct: string;
        mByproductAmount: number;
    }[];
    'mAvailableFuelClasses': number;
    'mFuelResourceForm': string;
    'mFuelLoadAmount': number;
    'mRequiresSupplementalResource': boolean;
    'mSupplementalLoadAmount': number;
    'mSupplementalToPowerRatio': number;
    'mIsFullBlast': boolean;
    'mCachedInputConnections': number;
    'mCachedPipeInputConnections': number;
    'mPowerProduction': number;
    'mLoadPercentage': number;
}
export interface FGBuildableGeneratorNuclear_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableGeneratorNuclear'";
    Classes: FGBuildableGeneratorNuclear_Class[];
}
export interface FGBuildablePipelinePump_Class extends FGBuildablePipelineJunction_Class {
    'mLastFlowUpdate': number;
    'mUpdateFlowTime': number;
    'mAnimSpeed': number;
    'mLastFlowValue': number;
    'mTimeScaleOffset': number;
    'mIsPipePumpPlaying': boolean;
    'mIsExceedingHeadLift': boolean;
    'mCurrentAudioHeadLift': number;
    'mMaxPressure': number;
    'mDesignPressure': number;
    'mDefaultFlowLimit': number;
    'mUserFlowLimit': number;
    'mMinimumFlowPercentForStandby': number;
    'mIndicatorData': string;
    'mPistonAudioTimer'?: string;
}
export interface FGBuildablePipelinePump_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePipelinePump'";
    Classes: FGBuildablePipelinePump_Class[];
}
export interface FGBuildableGeneratorFuel_Class extends FGBuildableSpaceElevator_Class {
    'm_SFXSockets': string;
    'm_CurrentPotential': number;
    'mFuelInventoryHandlerData': string;
    'mFuelClasses': number;
    'mDefaultFuelClasses': string;
    'mFuel': {
        mFuelClass: string;
        mSupplementalResourceClass: number;
        mByproduct: number;
        mByproductAmount: number;
    }[];
    'mAvailableFuelClasses': number;
    'mFuelResourceForm': string;
    'mFuelLoadAmount': number;
    'mRequiresSupplementalResource': boolean;
    'mSupplementalLoadAmount': number;
    'mSupplementalToPowerRatio': number;
    'mIsFullBlast': boolean;
    'mCachedInputConnections': number;
    'mCachedPipeInputConnections': number;
    'mPowerProduction': number;
    'mLoadPercentage': number;
    'mRTPCInterval'?: number;
    'mCachedLoadPercentage'?: number;
}
export interface FGBuildableGeneratorFuel_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableGeneratorFuel'";
    Classes: FGBuildableGeneratorFuel_Class[];
}
export interface FGBuildableJumppad_Class extends FGBuildableSpaceElevator_Class {
    'mPowerBankCapacity': number;
    'mLaunchPowerCost': number;
    'mChargeRateMultiplier': number;
    'mCurrentPowerLevel': number;
    'mLaunchVelocity': number;
    'mLaunchAngle': number;
    'mPlayerChainJumpResetTime': number;
    'mHasPowerForLaunch': boolean;
    'ComponentsToLaunch': number;
    'CharactersToLaunch': number;
    'VehiclesToLaunch': number;
    'mTrajectoryData': string;
    'mTrajectoryMeshScale': string;
    'mTrajectoryMeshRotation': string;
    'mDestinationMeshHeightOffset': number;
    'mTrajectorySplineMeshNumPrimitiveDataFloats': number;
    'mTrajectorySplineMeshSplineDataSettings': string;
    'mNumArrows': number;
    'mKillTimer': string;
    'mTrajectoryGravityMultiplier': number;
    'mShowTrajectoryCounter': number;
}
export interface FGBuildableJumppad_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableJumppad'";
    Classes: FGBuildableJumppad_Class[];
}
export interface FGBuildableManufacturerVariablePower_Class extends FGBuildableSpaceElevator_Class {
    'IsPowered': boolean;
    'mSequenceDuration': number;
    'mLightningTimer': string;
    'mGameTimeAtProducing': number;
    'mCurrentProducingSeekTime': number;
    'mStartVector_VFX_Small_Start': string;
    'mStartVector_VFX_Small_End': string;
    'mStartVector_VFX_Medium_Start': string;
    'mStartVector_VFX_Medium_End': string;
    'mStartVector_VFX_Large_Start': string;
    'mStartVector_VFX_Large_End': string;
    'mEstimatedMininumPowerConsumption': number;
    'mEstimatedMaximumPowerConsumption': number;
    'mCurrentRecipeChanged': string;
    'mManufacturingSpeed': number;
    'mFactoryInputConnections': number;
    'mPipeInputConnections': number;
    'mFactoryOutputConnections': number;
    'mPipeOutputConnections': number;
    'mInputInventoryHandlerData': string;
    'mOutputInventoryHandlerData': string;
}
export interface FGBuildableManufacturerVariablePower_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableManufacturerVariablePower'";
    Classes: FGBuildableManufacturerVariablePower_Class[];
}
export interface FGBuildableManufacturer_Class extends FGBuildableSpaceElevator_Class {
    'IsPowered': boolean;
    'mProductionEffectsRunning': boolean;
    'mCurrentRecipeChanged': string;
    'mManufacturingSpeed': number;
    'mFactoryInputConnections': number;
    'mPipeInputConnections': number;
    'mFactoryOutputConnections': number;
    'mPipeOutputConnections': number;
    'mInputInventoryHandlerData': string;
    'mOutputInventoryHandlerData': string;
    'bIsPendingToKillVfx'?: boolean;
    'mCurrentColor_VFX'?: string;
    'CurrentPackagingMode'?: number;
    'mCurrentColorVFX'?: string;
    'm_NotifyNameREferences'?: string;
    'mColor'?: number;
    'mIsRadioActive'?: boolean;
    'mStoppedProducingAnimationSounds'?: boolean;
    'mStoppedAkComponents'?: number;
    'mSocketStoppedAkComponents'?: number;
    'mIsPendingToKillVFX'?: boolean;
    'mCachedCurrentPotential'?: number;
    'mCurrentRecipeCheck'?: number;
    'mPreviousRecipeCheck'?: number;
    'CurrentPotentialConvert'?: string;
}
export interface FGBuildableManufacturer_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableManufacturer'";
    Classes: FGBuildableManufacturer_Class[];
}
export interface FGBuildableDroneStation_Class extends FGBuildableSpaceElevator_Class {
    'mStoppedProducingAnimationSounds': boolean;
    'mStoppedAkComponents': number;
    'mSocketStoppedAkComponents': number;
    'm_DockingStates': string;
    'm_OffsetTime': number;
    'mDroneDockingStartLocationLocal': string;
    'mDroneDockingLocationLocal': string;
    'mBatteryClasses': string;
    'mDroneDockingQueue': number;
    'mStationHasDronesInQueue': boolean;
    'mItemTransferringStage': string;
    'mTransferProgress': number;
    'mTransferSpeed': number;
    'mStackTransferSize': number;
    'mDroneQueueRadius': number;
    'mDroneQueueSeparationRadius': number;
    'mDroneQueueVerticalSeparation': number;
    'mTripPowerCost': number;
    'mTripPowerPerMeterCost': number;
    'mTripInformationSampleCount': number;
    'mStorageSizeX': number;
    'mStorageSizeY': number;
    'mBatteryStorageSizeX': number;
    'mBatteryStorageSizeY': number;
    'mInputInventoryHandler': string;
    'mOutputInventoryHandler': string;
    'mBatteryInventoryHandler': string;
    'mMapText': number;
}
export interface FGBuildableDroneStation_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableDroneStation'";
    Classes: FGBuildableDroneStation_Class[];
}
export interface FGBuildableTrainPlatformCargo_Class extends FGBuildableTrainPlatformEmpty_Class {
    'mOnTransferRateUpdated': string;
    'mFreightCargoType': string;
    'mStorageSizeX': number;
    'mStorageSizeY': number;
    'mCanUnloadAny': boolean;
    'mIsFullUnload': boolean;
    'mCanLoadAny': boolean;
    'mIsFullLoad': boolean;
    'mTimeToCompleteLoad': number;
    'mTimeToSwapLoadVisibility': number;
    'mTimeToCompleteUnload': number;
    'mTimeToSwapUnloadVisibility': number;
    'mWaitForConditionUpdatePeriod': number;
    'mStorageInputConnections': number;
    'mPipeInputConnections': number;
    'mPipeOutputConnections': number;
    'mDockingRuleSet': string;
    'mLoadItemFilter': number;
    'mUnloadItemFilter': number;
    'mHasFullyLoadUnloadRule': boolean;
    'mDockForDuration': number;
    'mMustDockForDuration': boolean;
    'mCurrentDockForDuration': number;
    'mHasAnyRelevantStacksToMove': boolean;
    'mAllowDepartureNoValidItemsToTransfer': boolean;
    'mShouldExecuteLoadOrUnload': boolean;
    'mRanCompleteBeforeNone': boolean;
    'mSwapCargoVisibilityTimerHandle': string;
    'mTimeSinceLastLoadTransferUpdate': number;
    'mTimeSinceLastUnloadTransferUpdate': number;
    'mSmoothedLoadRate': number;
    'mSmoothedUnloadRate': number;
    'mReplicatedOutflowRate': number;
    'mReplicatedInflowRate': number;
}
export interface FGBuildableTrainPlatformCargo_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableTrainPlatformCargo'";
    Classes: FGBuildableTrainPlatformCargo_Class[];
}


export type Docs = ("FGBuildableTrainPlatformCargo_Parent" | "FGBuildableDroneStation_Parent" | "FGBuildableManufacturer_Parent" | "FGBuildableManufacturerVariablePower_Parent" | "FGBuildableJumppad_Parent" | "FGBuildableGeneratorFuel_Parent" | "FGBuildablePipelinePump_Parent" | "FGBuildableGeneratorNuclear_Parent" | "FGBuildableDockingStation_Parent" | "FGBuildableTradingPost_Parent" | "FGBuildableResourceExtractor_Parent" | "FGBuildableWaterPump_Parent" | "FGBuildableFrackingActivator_Parent" | "FGBuildableRailroadStation_Parent" | "FGBuildableFrackingExtractor_Parent" | "FGPipeHyperStart_Parent" | "FGAmmoTypeProjectile_Parent" | "FGBuildablePowerStorage_Parent" | "FGBuildableGeneratorGeoThermal_Parent" | "FGBuildableResourceSink_Parent" | "FGBuildableTrainPlatformEmpty_Parent" | "FGBuildablePipeReservoir_Parent" | "FGBuildableFactory_Parent" | "FGBuildablePipelineJunction_Parent" | "FGBuildableStorage_Parent" | "FGBuildableRadarTower_Parent" | "FGBuildableFactorySimpleProducer_Parent" | "FGBuildableResourceSinkShop_Parent" | "FGBuildableSpaceElevator_Parent" | "FGAmmoTypeSpreadshot_Parent" | "FGAmmoTypeInstantHit_Parent" | "FGBuildablePipeline_Parent" | "FGBuildableWidgetSign_Parent" | "FGHoverPack_Parent" | "FGBuildableDoor_Parent" | "FGBuildablePriorityPowerSwitch_Parent" | "FGWeapon_Parent" | "FGChargedWeapon_Parent" | "FGBuildableRailroadTrack_Parent" | "FGBuildableRailroadSignal_Parent" | "FGBuildableCircuitSwitch_Parent" | "FGBuildableBlueprintDesigner_Parent" | "FGBuildablePassthrough_Parent" | "FGBuildablePassthroughPipeHyper_Parent" | "FGBuildableRamp_Parent" | "FGBuildableConveyorLift_Parent" | "FGBuildableSplitterSmart_Parent" | "FGBuildableLightsControlPanel_Parent" | "FGBuildableConveyorBelt_Parent" | "FGBuildableWire_Parent" | "FGBuildableFoundation_Parent" | "FGBuildableFoundationLightweight_Parent" | "FGBuildableLightSource_Parent" | "FGBuildableFloodlight_Parent" | "FGBuildableWallLightweight_Parent" | "FGBuildableWall_Parent" | "FGBuildablePoleLightweight_Parent" | "FGBuildablePipelineSupport_Parent" | "FGConveyorPoleStackable_Parent" | "FGBuildableLadder_Parent" | "FGBuildablePowerPole_Parent" | "FGBuildableBeamLightweight_Parent" | "FGBuildableCornerWall_Parent" | "FGBuildableWalkwayLightweight_Parent" | "FGBuildableWalkway_Parent" | "FGBuildablePipeHyper_Parent" | "FGBuildableMAM_Parent" | "FGBuildableStair_Parent" | "FGBuildable_Parent" | "FGBuildablePillarLightweight_Parent" | "FGResourceDescriptor_Parent" | "FGConsumableDescriptor_Parent" | "FGBuildableAttachmentMerger_Parent" | "FGBuildableAttachmentSplitter_Parent" | "FGBuildableSnowDispenser_Parent" | "FGBuildableFactoryBuilding_Parent" | "FGItemDescriptorNuclearFuel_Parent" | "FGVehicleDescriptor_Parent" | "FGObjectScanner_Parent" | "FGJetPack_Parent" | "FGChainsaw_Parent" | "FGItemDescriptor_Parent" | "FGSchematic_Parent" | "FGEquipmentDescriptor_Parent" | "FGItemDescriptorBiomass_Parent" | "FGBuildingDescriptor_Parent" | "FGPoleDescriptor_Parent" | "FGSuitBase_Parent" | "FGEquipmentZipline_Parent" | "FGEquipmentStunSpear_Parent" | "FGGasMask_Parent" | "FGGolfCartDispenser_Parent" | "FGConsumableEquipment_Parent" | "FGParachute_Parent" | "FGPortableMinerDispenser_Parent" | "FGJumpingStilts_Parent" | "FGCustomizationRecipe_Parent" | "FGRecipe_Parent" | "Generic_Parent")[];

export default Docs;