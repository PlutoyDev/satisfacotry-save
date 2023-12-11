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
    'mManufacturingMenuPriority': string;
    'mManufactoringDuration': string;
    'mManualManufacturingMultiplier': string;
    'mProducedIn': string;
    'mRelevantEvents': string;
    'mVariablePowerConsumptionConstant': string;
    'mVariablePowerConsumptionFactor': string;
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
    'mSprintSpeedFactor': string;
    'mJumpSpeedFactor': string;
    'mEquipmentSlot': string;
    'mAttachSocket': string;
    'mComponentNameToFirstPersonMaterials': string;
    'mNeedsDefaultEquipmentMappingContext': string;
    'mCostToUse': string;
    'mArmAnimation': string;
    'mBackAnimation': string;
    'mHasPersistentOwner': string;
    'mOnlyVisibleToOwner': string;
    'mDefaultEquipmentActions': string;
    'mReceivedDamageModifiers': string;
    'mSwappedOutThirdPersonMaterials': string;
}
export interface FGJumpingStilts_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGJumpingStilts'";
    Classes: FGJumpingStilts_Class[];
}
export interface FGPortableMinerDispenser_Class extends Generic_Class {
    'mAllowedResourceForms': string;
    'mPlaceDistanceMax': string;
    'mEquipmentSlot': string;
    'mAttachSocket': string;
    'mComponentNameToFirstPersonMaterials': string;
    'mNeedsDefaultEquipmentMappingContext': string;
    'mCostToUse': string;
    'mArmAnimation': string;
    'mBackAnimation': string;
    'mHasPersistentOwner': string;
    'mOnlyVisibleToOwner': string;
    'mDefaultEquipmentActions': string;
    'mReceivedDamageModifiers': string;
    'mSwappedOutThirdPersonMaterials': string;
}
export interface FGPortableMinerDispenser_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGPortableMinerDispenser'";
    Classes: FGPortableMinerDispenser_Class[];
}
export interface FGParachute_Class extends Generic_Class {
    'ArmEquipmentsToSkipAnim': string;
    'DeployedVFXComponents': string;
    'mUseDistanceOverride': string;
    'mIsDeployed': string;
    'mEquipmentSlot': string;
    'mAttachSocket': string;
    'mComponentNameToFirstPersonMaterials': string;
    'mNeedsDefaultEquipmentMappingContext': string;
    'mCostToUse': string;
    'mArmAnimation': string;
    'mBackAnimation': string;
    'mHasPersistentOwner': string;
    'mOnlyVisibleToOwner': string;
    'mDefaultEquipmentActions': string;
    'mReceivedDamageModifiers': string;
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
    'mNeedsDefaultEquipmentMappingContext': string;
    'mCostToUse': string;
    'mArmAnimation': string;
    'mBackAnimation': string;
    'mHasPersistentOwner': string;
    'mOnlyVisibleToOwner': string;
    'mDefaultEquipmentActions': string;
    'mReceivedDamageModifiers': string;
    'mSwappedOutThirdPersonMaterials': string;
    'mRandomAnim'?: string;
    'mCanPress'?: string;
    'mAnimData'?: string;
    'mCurrentAnimData'?: string;
}
export interface FGConsumableEquipment_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGConsumableEquipment'";
    Classes: FGConsumableEquipment_Class[];
}
export interface FGGolfCartDispenser_Class extends Generic_Class {
    'mMaxSpawnDistance': string;
    'mSpawningClearance': string;
    'mBuildDisqualifierText': string;
    'canDisplayDisqualifier': string;
    'mPlaceDistanceMax': string;
    'mEquipmentSlot': string;
    'mAttachSocket': string;
    'mComponentNameToFirstPersonMaterials': string;
    'mNeedsDefaultEquipmentMappingContext': string;
    'mCostToUse': string;
    'mArmAnimation': string;
    'mBackAnimation': string;
    'mHasPersistentOwner': string;
    'mOnlyVisibleToOwner': string;
    'mDefaultEquipmentActions': string;
    'mReceivedDamageModifiers': string;
    'mSwappedOutThirdPersonMaterials': string;
}
export interface FGGolfCartDispenser_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGGolfCartDispenser'";
    Classes: FGGolfCartDispenser_Class[];
}
export interface FGGasMask_Class extends Generic_Class {
    'mDamageTypesToProtectAgainst': string;
    'mPostProcessEnabled': string;
    'mFilterCountdown': string;
    'mFilterDuration': string;
    'mIsInPoisonGas': string;
    'mEquipmentSlot': string;
    'mAttachSocket': string;
    'mComponentNameToFirstPersonMaterials': string;
    'mNeedsDefaultEquipmentMappingContext': string;
    'mCostToUse': string;
    'mArmAnimation': string;
    'mBackAnimation': string;
    'mHasPersistentOwner': string;
    'mOnlyVisibleToOwner': string;
    'mDefaultEquipmentActions': string;
    'mReceivedDamageModifiers': string;
    'mSwappedOutThirdPersonMaterials': string;
}
export interface FGGasMask_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGGasMask'";
    Classes: FGGasMask_Class[];
}
export interface FGEquipmentStunSpear_Class extends Generic_Class {
    'mPunchAnimationWeight': string;
    'mDamageTypes': string;
    'mSecondSwingMaxTime': string;
    'mSecondSwingCooldDownTime': string;
    'mAttackDistance': string;
    'mAttackSweepRadius': string;
    'mEquipmentSlot': string;
    'mAttachSocket': string;
    'mComponentNameToFirstPersonMaterials': string;
    'mNeedsDefaultEquipmentMappingContext': string;
    'mCostToUse': string;
    'mArmAnimation': string;
    'mBackAnimation': string;
    'mHasPersistentOwner': string;
    'mOnlyVisibleToOwner': string;
    'mDefaultEquipmentActions': string;
    'mReceivedDamageModifiers': string;
    'mSwappedOutThirdPersonMaterials': string;
    'mRandomAttackAnim'?: string;
    'mRandomEquipAnim'?: string;
}
export interface FGEquipmentStunSpear_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGEquipmentStunSpear'";
    Classes: FGEquipmentStunSpear_Class[];
}
export interface FGEquipmentZipline_Class extends Generic_Class {
    'mShouldPlayDeactivateSound': string;
    'mZiplineJumpLaunchVelocity': string;
    'mMaxZiplineAngle': string;
    'mTraceDistance': string;
    'mTraceStartOffset': string;
    'mTraceRadius': string;
    'mVisualizeTraceDistance': string;
    'mActiveNoiseFrequency': string;
    'mZiplineReattachCooldown': string;
    'mEquipmentSlot': string;
    'mAttachSocket': string;
    'mComponentNameToFirstPersonMaterials': string;
    'mNeedsDefaultEquipmentMappingContext': string;
    'mCostToUse': string;
    'mArmAnimation': string;
    'mBackAnimation': string;
    'mHasPersistentOwner': string;
    'mOnlyVisibleToOwner': string;
    'mDefaultEquipmentActions': string;
    'mReceivedDamageModifiers': string;
    'mSwappedOutThirdPersonMaterials': string;
}
export interface FGEquipmentZipline_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGEquipmentZipline'";
    Classes: FGEquipmentZipline_Class[];
}
export interface FGSuitBase_Class extends Generic_Class {
    'mImmunity': string;
    'mIsWorking': string;
    'mHasNegatedDamage': string;
    'mDamageNegated': string;
    'mFilterDuration': string;
    'mCountdown': string;
    'mDisableEffectTimer': string;
    'mIsBurningFuel': string;
    'mSuit1PMeshMaterials': string;
    'mEquipmentSlot': string;
    'mAttachSocket': string;
    'mComponentNameToFirstPersonMaterials': string;
    'mNeedsDefaultEquipmentMappingContext': string;
    'mCostToUse': string;
    'mArmAnimation': string;
    'mBackAnimation': string;
    'mHasPersistentOwner': string;
    'mOnlyVisibleToOwner': string;
    'mDefaultEquipmentActions': string;
    'mReceivedDamageModifiers': string;
    'mSwappedOutThirdPersonMaterials': string;
}
export interface FGSuitBase_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGSuitBase'";
    Classes: FGSuitBase_Class[];
}
export interface FGPoleDescriptor_Class extends Generic_Class {
    'mDisplayName': string;
    'mDescription': string;
    'mAbbreviatedDisplayName': string;
    'mStackSize': string;
    'mCanBeDiscarded': string;
    'mRememberPickUp': string;
    'mEnergyValue': string;
    'mRadioactiveDecay': string;
    'mForm': string;
    'mSmallIcon': string;
    'mPersistentBigIcon': string;
    'mCrosshairMaterial': string;
    'mDescriptorStatBars': string;
    'mSubCategories': string;
    'mMenuPriority': string;
    'mFluidColor': string;
    'mGasColor': string;
    'mCompatibleItemDescriptors': string;
    'mClassToScanFor': string;
    'mScannableType': string;
    'mShouldOverrideScannerDisplayText': string;
    'mScannerDisplayText': string;
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
    'mResourceSinkPoints': string;
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
    'mDescription': string;
    'mSubCategories': string;
    'mMenuPriority': string;
    'mTechTier': string;
    'mCost': string;
    'mTimeToComplete': string;
    'mRelevantShopSchematics': string;
    'mIsPlayerSpecific': string;
    'mUnlocks': {
        Class: string;
        mEmotes: string;
    }[];
    'mSchematicIcon': string;
    'mSmallSchematicIcon': string;
    'mSchematicDependencies': undefined[];
    'mDependenciesBlocksSchematicAccess': string;
    'mHiddenUntilDependenciesMet': string;
    'mRelevantEvents': string;
    'mIncludeInBuilds': string;
    'mUnlockName'?: string;
    'mUnlockDescription'?: string;
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
    'mSawingMontageLength': string;
    'mInterpSawProgress': string;
    'mCurrentOutputDataSFX': string;
    'mCurrentAkID': string;
    'mCurrentHasFuel': string;
    'mPreviousState': string;
    'mEnergyConsumption': string;
    'mSawDownTreeTime': string;
    'mCollateralPickupRadius': string;
    'mExcludeChainsawableFoliage': string;
    'mEnergyStored': string;
    'mSawingProgress': string;
    'mChainsawState': string;
    'mEquipmentSlot': string;
    'mAttachSocket': string;
    'mComponentNameToFirstPersonMaterials': string;
    'mNeedsDefaultEquipmentMappingContext': string;
    'mCostToUse': string;
    'mArmAnimation': string;
    'mBackAnimation': string;
    'mHasPersistentOwner': string;
    'mOnlyVisibleToOwner': string;
    'mDefaultEquipmentActions': string;
    'mReceivedDamageModifiers': string;
    'mSwappedOutThirdPersonMaterials': string;
}
export interface FGChainsaw_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGChainsaw'";
    Classes: FGChainsaw_Class[];
}
export interface FGJetPack_Class extends Generic_Class {
    'FuelTypeDescriptos': string;
    'mOnFuelAmountChanged': string;
    'mOnBurnPercentChanged': string;
    'mOnFuelTypeChanged': string;
    'mDefaultAirControl': string;
    'mRTPCInterval': string;
    'mThrustCooldown': string;
    'mCurrentFuel': string;
    'mIsThrusting': string;
    'mFuelTypes': string;
    'mSelectedFuelType': string;
    'mCurrentFuelType': string;
    'mActiveNoiseFrequency': string;
    'mEquipmentSlot': string;
    'mAttachSocket': string;
    'mComponentNameToFirstPersonMaterials': string;
    'mNeedsDefaultEquipmentMappingContext': string;
    'mCostToUse': string;
    'mArmAnimation': string;
    'mBackAnimation': string;
    'mHasPersistentOwner': string;
    'mOnlyVisibleToOwner': string;
    'mDefaultEquipmentActions': string;
    'mReceivedDamageModifiers': string;
    'mSwappedOutThirdPersonMaterials': string;
}
export interface FGJetPack_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGJetPack'";
    Classes: FGJetPack_Class[];
}
export interface FGObjectScanner_Class extends Generic_Class {
    'mPlayingSound': string;
    'mScreenUpdateTimer': string;
    'mScanlineLerpT': string;
    'mScreenUpdateTime': string;
    'mNormalizedCloesnessToObject': string;
    'mObjectIsWithinRange': string;
    'mIsPlayingStaticSound': string;
    'mBeepDelayMax': string;
    'mBeepDelayMin': string;
    'mDetectionRange': string;
    'mUpdateClosestObjectTime': string;
    'mClosestObjectInScanRange': string;
    'mNormalizedDistanceToClosestObject': string;
    'mAngleToClosestObject': string;
    'mEquipmentSlot': string;
    'mAttachSocket': string;
    'mComponentNameToFirstPersonMaterials': string;
    'mNeedsDefaultEquipmentMappingContext': string;
    'mCostToUse': string;
    'mArmAnimation': string;
    'mBackAnimation': string;
    'mHasPersistentOwner': string;
    'mOnlyVisibleToOwner': string;
    'mDefaultEquipmentActions': string;
    'mReceivedDamageModifiers': string;
    'mSwappedOutThirdPersonMaterials': string;
}
export interface FGObjectScanner_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGObjectScanner'";
    Classes: FGObjectScanner_Class[];
}
export interface FGVehicleDescriptor_Class extends FGBuildingDescriptor_Class {
    'mFuelConsumption': string;
    'mInventorySize': string;
    'mPowerConsumption'?: string;
}
export interface FGVehicleDescriptor_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGVehicleDescriptor'";
    Classes: FGVehicleDescriptor_Class[];
}
export interface FGItemDescriptorNuclearFuel_Class extends FGItemDescriptor_Class {
    'mSpentFuelClass': string;
    'mAmountOfWaste': string;
}
export interface FGItemDescriptorNuclearFuel_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGItemDescriptorNuclearFuel'";
    Classes: FGItemDescriptorNuclearFuel_Class[];
}
export interface FGBuildableFactoryBuilding_Class extends Generic_Class {
    'mDisplayName': string;
    'mDescription': string;
    'MaxRenderDistance': string;
    'mAlternativeMaterialRecipes': string;
    'mContainsComponents': string;
    'mIsConsideredForBaseWeightValue': string;
    'mBuildEffectSpeed': string;
    'mAllowColoring': string;
    'mAllowPatterning': string;
    'mSkipBuildEffect': string;
    'mForceNetUpdateOnRegisterPlayer': string;
    'mToggleDormancyOnInteraction': string;
    'mIsMultiSpawnedBuildable': string;
    'mShouldShowAttachmentPointVisuals': string;
    'mCreateClearanceMeshRepresentation': string;
    'mCanContainLightweightInstances': string;
    'mAffectsOcclusion': string;
    'mOcclusionShape': string;
    'mScaleCustomOffset': string;
    'mCustomScaleType': string;
    'mOcclusionBoxInfo': string;
    'mAttachmentPoints': string;
    'mInteractingPlayers': string;
    'mIsUseable': string;
    'mHideOnBuildEffectStart': string;
    'mShouldModifyWorldGrid': string;
    'mBlueprintBuildEffectID': string;
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
    'mCurrentOutputIndex': string;
}
export interface FGBuildableAttachmentSplitter_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableAttachmentSplitter'";
    Classes: FGBuildableAttachmentSplitter_Class[];
}
export interface FGBuildableAttachmentMerger_Class extends FGBuildableSnowDispenser_Class {
    'mCurrentInputIndex': string;
}
export interface FGBuildableAttachmentMerger_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableAttachmentMerger'";
    Classes: FGBuildableAttachmentMerger_Class[];
}
export interface FGConsumableDescriptor_Class extends FGItemDescriptor_Class {
    'mCustomHandsMeshScale': string;
    'mCustomRotation': string;
    'mCustomLocation': string;
    'mHealthGain'?: string;
}
export interface FGConsumableDescriptor_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGConsumableDescriptor'";
    Classes: FGConsumableDescriptor_Class[];
}
export interface FGResourceDescriptor_Class extends FGItemDescriptor_Class {
    'mDecalSize': string;
    'mPingColor': string;
    'mCollectSpeedMultiplier': string;
    'mManualMiningAudioName': string;
}
export interface FGResourceDescriptor_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGResourceDescriptor'";
    Classes: FGResourceDescriptor_Class[];
}
export interface FGBuildablePillarLightweight_Class extends FGBuildableSnowDispenser_Class {
    'mSize': string;
    'mIsSupport': string;
}
export interface FGBuildablePillarLightweight_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePillarLightweight'";
    Classes: FGBuildablePillarLightweight_Class[];
}
export interface FGBuildable_Class extends FGBuildableSnowDispenser_Class {
    'mOccupiedText'?: string;
    'Tier'?: string;
}
export interface FGBuildable_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildable'";
    Classes: FGBuildable_Class[];
}
export interface FGBuildableStair_Class extends FGBuildableSnowDispenser_Class {
    'mStairDirection': string;
    'mHeight': string;
    'mSize': string;
}
export interface FGBuildableStair_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableStair'";
    Classes: FGBuildableStair_Class[];
}
export interface FGBuildableMAM_Class extends FGBuildableSnowDispenser_Class {
    'mOccupiedText': string;
    'mCurrentResearchState': string;
    'mSignificanceRange': string;
}
export interface FGBuildableMAM_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableMAM'";
    Classes: FGBuildableMAM_Class[];
}
export interface FGBuildablePipeHyper_Class extends FGBuildableSnowDispenser_Class {
    'mMeshLength': string;
    'mSplineData': string;
    'mSnappedPassthroughs': string;
}
export interface FGBuildablePipeHyper_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePipeHyper'";
    Classes: FGBuildablePipeHyper_Class[];
}
export interface FGBuildableWalkway_Class extends FGBuildableSnowDispenser_Class {
    'mSize': string;
    'mElevation': string;
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
    'mSize': string;
    'mHeight': string;
    'mIsInverted': string;
}
export interface FGBuildableCornerWall_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableCornerWall'";
    Classes: FGBuildableCornerWall_Class[];
}
export interface FGBuildableBeamLightweight_Class extends FGBuildableSnowDispenser_Class {
    'mSize': string;
    'mDefaultLength': string;
    'mMaxLength': string;
    'mLength': string;
}
export interface FGBuildableBeamLightweight_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableBeamLightweight'";
    Classes: FGBuildableBeamLightweight_Class[];
}
export interface FGBuildablePowerPole_Class extends FGBuildableSnowDispenser_Class {
    'mPowerConnections': string;
    'mPowerPoleType': string;
    'mPowerTowerWireMaxLength': string;
    'mHasPower': string;
}
export interface FGBuildablePowerPole_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePowerPole'";
    Classes: FGBuildablePowerPole_Class[];
}
export interface FGBuildableLadder_Class extends FGBuildableSnowDispenser_Class {
    'mWidth': string;
    'mMeshHeight': string;
    'mMaxSegmentCount': string;
    'mNumSegments': string;
    'mLadderMeshes': string;
}
export interface FGBuildableLadder_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableLadder'";
    Classes: FGBuildableLadder_Class[];
}
export interface FGConveyorPoleStackable_Class extends FGBuildableSnowDispenser_Class {
    'mHeight': string;
    'mSelectedPoleVersion': string;
    'mUseStaticHeight': string;
    'mCanStack': string;
    'mStackHeight': string;
}
export interface FGConveyorPoleStackable_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGConveyorPoleStackable'";
    Classes: FGConveyorPoleStackable_Class[];
}
export interface FGBuildablePipelineSupport_Class extends FGBuildableSnowDispenser_Class {
    'mLength': string;
    'mVerticalAngle': string;
    'mUseStaticHeight': string;
    'mCanStack': string;
    'mStackHeight': string;
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
    'mWidth': string;
    'mHeight': string;
    'mElevation': string;
    'mAngularDepth': string;
    'mWallType': string;
    'mAngledVariants': string;
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
    'mFixtureAngle': string;
    'OnBuildableLightSourceStateChanged': string;
    'mIsEnabled': string;
    'mLightControlData': string;
    'mPowerConsumption': string;
    'mHasPower': string;
    'mIsDay': string;
}
export interface FGBuildableFloodlight_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFloodlight'";
    Classes: FGBuildableFloodlight_Class[];
}
export interface FGBuildableLightSource_Class extends FGBuildableSnowDispenser_Class {
    'newCustomizationData': string;
    'OnBuildableLightSourceStateChanged': string;
    'mIsEnabled': string;
    'mLightControlData': string;
    'mPowerConsumption': string;
    'mHasPower': string;
    'mIsDay': string;
}
export interface FGBuildableLightSource_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableLightSource'";
    Classes: FGBuildableLightSource_Class[];
}
export interface FGBuildableFoundationLightweight_Class extends FGBuildableSnowDispenser_Class {
    'mWidth': string;
    'mDepth': string;
    'mHeight': string;
    'mElevation': string;
    'mIsFrame': string;
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
    'mMaxLength': string;
    'mMaxPowerTowerLength': string;
    'mLengthPerCost': string;
    'mConnections': string;
    'mConnectionLocations': string;
    'mWireInstances': string;
    'mCachedLength': string;
}
export interface FGBuildableWire_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableWire'";
    Classes: FGBuildableWire_Class[];
}
export interface FGBuildableConveyorBelt_Class extends FGBuildableSnowDispenser_Class {
    'mCustomSkins': string;
    'mMeshLength': string;
    'mItemMeshMap': string;
    'mSplineData': string;
    'mSpeed': string;
    'mItems': string;
    'mConveyorChainFlags': string;
}
export interface FGBuildableConveyorBelt_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableConveyorBelt'";
    Classes: FGBuildableConveyorBelt_Class[];
}
export interface FGBuildableLightsControlPanel_Class extends FGBuildableSnowDispenser_Class {
    'OnLightControlPanelStateChanged': string;
    'mLightControlData': string;
    'mIsEnabled': string;
    'mOnControlledBuildablesChanged': string;
    'mControlledBuildables': string;
    'mOnCircuitsChanged': string;
    'mIsBridgeConnected': string;
    'mConnections': string;
}
export interface FGBuildableLightsControlPanel_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableLightsControlPanel'";
    Classes: FGBuildableLightsControlPanel_Class[];
}
export interface FGBuildableSplitterSmart_Class extends FGBuildableAttachmentSplitter_Class {
    'OnSortRulesChangedDelegate': string;
    'mMaxNumSortRules': string;
    'mLastItem': string;
    'mItemToLastOutputMap': string;
    'mLastOutputIndex': string;
    'mCurrentInventoryIndex': string;
    'mDistributionTable': string;
}
export interface FGBuildableSplitterSmart_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableSplitterSmart'";
    Classes: FGBuildableSplitterSmart_Class[];
}
export interface FGBuildableConveyorLift_Class extends FGBuildableSnowDispenser_Class {
    'mMeshHeight': string;
    'mTopTransform': string;
    'mIsReversed': string;
    'mItemMeshMap': string;
    'mSnappedPassthroughs': string;
    'mSpeed': string;
    'mItems': string;
    'mConveyorChainFlags': string;
}
export interface FGBuildableConveyorLift_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableConveyorLift'";
    Classes: FGBuildableConveyorLift_Class[];
}
export interface FGBuildableRamp_Class extends FGBuildableFoundation_Class {
    'mIsDoubleRamp': string;
    'mIsRoof': string;
}
export interface FGBuildableRamp_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableRamp'";
    Classes: FGBuildableRamp_Class[];
}
export interface FGBuildablePassthroughPipeHyper_Class extends FGBuildableSnowDispenser_Class {
    'mSnappedBuildingThickness': string;
    'mMidMeshLength': string;
    'mGenerateTunnelCollision': string;
    'mEndCapRotation': string;
    'mMidMeshRotation': string;
    'mEndCapTranslation': string;
    'mClearanceHeightMin': string;
    'mClearanceThickness': string;
    'mCostSegmentLength': string;
    'mGeneratedMeshComponents': string;
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
    'mTerminalDistanceFromEdge': string;
    'mTerminalHalfDepth': string;
    'mDimensions': string;
    'OnRecordDataChanged': string;
    'OnBlueprintCostChanged': string;
    'mCurrentCost': string;
    'mBuildables': string;
    'mIntersectComponents': string;
    'mCurrentRecordData': string;
    'mIsDismantlingAll': string;
}
export interface FGBuildableBlueprintDesigner_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableBlueprintDesigner'";
    Classes: FGBuildableBlueprintDesigner_Class[];
}
export interface FGBuildableCircuitSwitch_Class extends FGBuildableSnowDispenser_Class {
    'mTextRenderers': string;
    'bIsSignificant': string;
    'mMaxCharacters': string;
    'mOnIsSwitchOnChanged': string;
    'mOnIsConnectedChanged': string;
    'mOnBuildingTagChanged': string;
    'mIsSwitchOn': string;
    'mHasBuildingTag': string;
    'mBuildingTag': string;
    'mOnCircuitsChanged': string;
    'mIsBridgeConnected': string;
    'mConnections': string;
}
export interface FGBuildableCircuitSwitch_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableCircuitSwitch'";
    Classes: FGBuildableCircuitSwitch_Class[];
}
export interface FGBuildableRailroadSignal_Class extends FGBuildableSnowDispenser_Class {
    'mPreviousAspect': string;
    'mOnAspectChangedDelegate': string;
    'mOnBlockValidationChangedDelegate': string;
    'mDrawDebugVisualState': string;
    'mGuardedConnections': string;
    'mObservedConnections': string;
    'mAspect': string;
    'mBlockValidation': string;
    'mIsPathSignal': string;
    'mIsBiDirectional': string;
    'mVisualState': string;
    'mSignificanceRange': string;
}
export interface FGBuildableRailroadSignal_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableRailroadSignal'";
    Classes: FGBuildableRailroadSignal_Class[];
}
export interface FGBuildableRailroadTrack_Class extends FGBuildableSnowDispenser_Class {
    'mMeshLength': string;
    'mConnections': string;
    'mIsOwnedByPlatform': string;
    'mTrackGraphID': string;
    'mOverlappingTracks': string;
    'mVehicles': string;
    'mSignalBlockID': string;
    'mBlockVisualizationMeshLength': string;
    'mBlockVisualizationNumPrimitiveDataFloats': string;
    'mBlockVisualizationNumPerInstancePrimitiveDataCountOffset': string;
    'mBlockVisualizationSplineDataSettings': string;
    'mBlockVisualizationColorDataStartIndex': string;
}
export interface FGBuildableRailroadTrack_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableRailroadTrack'";
    Classes: FGBuildableRailroadTrack_Class[];
}
export interface FGChargedWeapon_Class extends Generic_Class {
    'mShowCycleAmmoRadialMenuTimer': string;
    'mRadialMenuShowUpTime': string;
    'mDispensedProjectiles': string;
    'mIsPendingExecuteFire': string;
    'mMaxChargeTime': string;
    'mMaxThrowForce': string;
    'mMinThrowForce': string;
    'mDelayBetweenSecondaryTriggers': string;
    'mOnWeaponStateChanged': string;
    'mWeaponState': string;
    'mAutomaticallyReload': string;
    'mAutoReloadDelay': string;
    'mAutoReloadTimerHandle': string;
    'mCurrentAmmoCount': string;
    'mAllowedAmmoClasses': string;
    'mAttachMagazineToPlayer': string;
    'mMuzzleSocketName': string;
    'mCurrentMagazineBoneName': string;
    'mEjectMagazineBoneName': string;
    'mDispersionOnNoMagazine': string;
    'mWeaponDamageMultiplier': string;
    'mFiringBlocksDispersionReduction': string;
    'mCurrentDispersion': string;
    'mReloadTime': string;
    'mAmmoSwitchUsedRadialMenu': string;
    'mOnAmmoCyclingPressed': string;
    'mOnAmmoCyclingReleased': string;
    'mBlockSprintWhenFiring': string;
    'mEquipmentSlot': string;
    'mAttachSocket': string;
    'mComponentNameToFirstPersonMaterials': string;
    'mNeedsDefaultEquipmentMappingContext': string;
    'mCostToUse': string;
    'mArmAnimation': string;
    'mBackAnimation': string;
    'mHasPersistentOwner': string;
    'mOnlyVisibleToOwner': string;
    'mDefaultEquipmentActions': string;
    'mReceivedDamageModifiers': string;
    'mSwappedOutThirdPersonMaterials': string;
}
export interface FGChargedWeapon_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGChargedWeapon'";
    Classes: FGChargedWeapon_Class[];
}
export interface FGWeapon_Class extends Generic_Class {
    'mMuteDryFire': string;
    'mRandomReloadAnim': string;
    'mRandomStingerAnim': string;
    'mRebarGunStingerID': string;
    'mRebarGunEquipID': string;
    'mShowCycleAmmoRadialMenuTimer': string;
    'mOnWeaponStateChanged': string;
    'mWeaponState': string;
    'mAutomaticallyReload': string;
    'mAutoReloadDelay': string;
    'mAutoReloadTimerHandle': string;
    'mCurrentAmmoCount': string;
    'mAllowedAmmoClasses': string;
    'mAttachMagazineToPlayer': string;
    'mMuzzleSocketName': string;
    'mCurrentMagazineBoneName': string;
    'mEjectMagazineBoneName': string;
    'mDispersionOnNoMagazine': string;
    'mWeaponDamageMultiplier': string;
    'mFiringBlocksDispersionReduction': string;
    'mCurrentDispersion': string;
    'mReloadTime': string;
    'mAmmoSwitchUsedRadialMenu': string;
    'mOnAmmoCyclingPressed': string;
    'mOnAmmoCyclingReleased': string;
    'mBlockSprintWhenFiring': string;
    'mEquipmentSlot': string;
    'mAttachSocket': string;
    'mComponentNameToFirstPersonMaterials': string;
    'mNeedsDefaultEquipmentMappingContext': string;
    'mCostToUse': string;
    'mArmAnimation': string;
    'mBackAnimation': string;
    'mHasPersistentOwner': string;
    'mOnlyVisibleToOwner': string;
    'mDefaultEquipmentActions': string;
    'mReceivedDamageModifiers': string;
    'mSwappedOutThirdPersonMaterials': string;
    'Fire'?: string;
    'mHasReloadedOnce'?: string;
}
export interface FGWeapon_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGWeapon'";
    Classes: FGWeapon_Class[];
}
export interface FGBuildablePriorityPowerSwitch_Class extends FGBuildableCircuitSwitch_Class {
    'mOnPriorityChanged': string;
    'mPriority': string;
}
export interface FGBuildablePriorityPowerSwitch_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePriorityPowerSwitch'";
    Classes: FGBuildablePriorityPowerSwitch_Class[];
}
export interface FGBuildableDoor_Class extends FGBuildableWallLightweight_Class {
    'IsDoorOpen': string;
    'mCanBeLocked': string;
    'mAnimationRate': string;
    'mMovementRate': string;
    'EasingFunction': string;
    'BlendExp': string;
    'Steps': string;
    'bigOverlapList'?: string;
}
export interface FGBuildableDoor_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableDoor'";
    Classes: FGBuildableDoor_Class[];
}
export interface FGHoverPack_Class extends Generic_Class {
    'mHoverPackActiveTimer': string;
    'mCurrentPlayerVelocity': string;
    'mCurrentMouseDelta': string;
    'mHoverpackJoystickTimer': string;
    'mCurrentBatteryPowerLevel': string;
    'm_PreviousHoverMode': string;
    'ConnectionLocationUpdatedDelegate': string;
    'ConnectionStatusUpdatedDelegate': string;
    'HoverModeChangedDelegate': string;
    'RangeWarningToggleDelegate': string;
    'mHoverSpeed': string;
    'mHoverAccelerationSpeed': string;
    'mHoverSprintMultiplier': string;
    'mHoverFriction': string;
    'mJumpKeyHoldActivationTime': string;
    'mFallSpeedLimitWhenPowered': string;
    'mPowerConnectionSearchRadius': string;
    'mPowerConnectionSearchTickRate': string;
    'mPowerConnectionDisconnectionTime': string;
    'mPowerCapacity': string;
    'mPowerDrainRate': string;
    'mPowerConsumption': string;
    'mCurrentPowerLevel': string;
    'mRangeWarningNormalizedDistanceThreshold': string;
    'mCurrentHoverMode': string;
    'mHasConnection': string;
    'mShouldAutomaticallyHoverWhenConnected': string;
    'mCrouchHoverCancelTime': string;
    'mCharacterUseDistanceWhenActive': string;
    'mActiveNoiseFrequency': string;
    'mCurrentConnectionLocation': string;
    'mEquipmentSlot': string;
    'mAttachSocket': string;
    'mComponentNameToFirstPersonMaterials': string;
    'mNeedsDefaultEquipmentMappingContext': string;
    'mCostToUse': string;
    'mArmAnimation': string;
    'mBackAnimation': string;
    'mHasPersistentOwner': string;
    'mOnlyVisibleToOwner': string;
    'mDefaultEquipmentActions': string;
    'mReceivedDamageModifiers': string;
    'mSwappedOutThirdPersonMaterials': string;
}
export interface FGHoverPack_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGHoverPack'";
    Classes: FGHoverPack_Class[];
}
export interface FGBuildableWidgetSign_Class extends FGBuildableSnowDispenser_Class {
    'mGainSignificanceDistance': string;
    'mTextElementToDataMap': string;
    'mIconElementToDataMap': string;
    'mSignDrawSize': string;
    'mPrefabTextElementSaveData': string;
    'mPrefabIconElementSaveData': string;
    'mForegroundColor': string;
    'mBackgroundColor': string;
    'mAuxilaryColor': string;
    'mEmissive': string;
    'mGlossiness': string;
    'mDataVersion': string;
    'mSignPoles': string;
    'mWorldDimensions': string;
    'mPoleOffset': string;
    'mPoleScale': string;
    'mSignToSignOffset': string;
}
export interface FGBuildableWidgetSign_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableWidgetSign'";
    Classes: FGBuildableWidgetSign_Class[];
}
export interface FGBuildablePipeline_Class extends FGBuildablePipeHyper_Class {
    'mRadius': string;
    'mFlowLimit': string;
    'mFlowIndicatorMinimumPipeLength': string;
    'mPipeConnections': string;
    'mFluidBox': string;
    'mIndicatorData': string;
    'mMaxIndicatorTurnAngle': string;
    'mIgnoreActorsForIndicator': string;
    'mFluidNames': string;
    'mCurrentFluid': string;
    'mLastContentForSound': string;
    'mLastFlowForSound': string;
    'mRattleLimit': string;
    'mIsRattling': string;
    'mUpdateSoundsHandle': string;
}
export interface FGBuildablePipeline_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePipeline'";
    Classes: FGBuildablePipeline_Class[];
}
export interface FGAmmoTypeInstantHit_Class extends FGItemDescriptor_Class {
    'Location': string;
    'Trail_Velocity': string;
    'mPlayFireEffects': string;
    'AmmoFiredDelegate': string;
    'mFiringTransform': string;
    'mFiringDirection': string;
    'mMagazineSize': string;
    'mMaxAmmoEffectiveRange': string;
    'mReloadTimeMultiplier': string;
    'mFireRate': string;
    'mFiringTransformIgnoresDispersion': string;
    'mDispersionFireRateMultiplier': string;
    'mDispersionPerShot': string;
    'mRestingDispersion': string;
    'mFiringDispersion': string;
    'mDispersionRecoveryTime': string;
    'mHasBeenInitialized': string;
    'mWeaponDamageMultiplier': string;
    'mMagazineMeshMaterials': string;
    'mMagazineMeshMaterials1p': string;
    'mDamageTypesOnImpact': string;
    'mAmmoDamageFalloff': string;
    'mMuzzleFlashScale': string;
    'mFiringSounds': string;
    'mFiringSounds1P': string;
    'mAmmoColor': string;
    'mAmmoScale': string;
    'mAmmoTickFunction': string;
}
export interface FGAmmoTypeInstantHit_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGAmmoTypeInstantHit'";
    Classes: FGAmmoTypeInstantHit_Class[];
}
export interface FGAmmoTypeSpreadshot_Class extends FGItemDescriptor_Class {
    'SpreadTrail_Velocity': string;
    'mNumShots': string;
    'mSpreadAngleDegrees': string;
    'AmmoFiredDelegate': string;
    'mFiringTransform': string;
    'mFiringDirection': string;
    'mMagazineSize': string;
    'mMaxAmmoEffectiveRange': string;
    'mReloadTimeMultiplier': string;
    'mFireRate': string;
    'mFiringTransformIgnoresDispersion': string;
    'mDispersionFireRateMultiplier': string;
    'mDispersionPerShot': string;
    'mRestingDispersion': string;
    'mFiringDispersion': string;
    'mDispersionRecoveryTime': string;
    'mHasBeenInitialized': string;
    'mWeaponDamageMultiplier': string;
    'mMagazineMeshMaterials': string;
    'mMagazineMeshMaterials1p': string;
    'mDamageTypesOnImpact': string;
    'mAmmoDamageFalloff': string;
    'mMuzzleFlashScale': string;
    'mFiringSounds': string;
    'mFiringSounds1P': string;
    'mAmmoColor': string;
    'mAmmoScale': string;
    'mAmmoTickFunction': string;
}
export interface FGAmmoTypeSpreadshot_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGAmmoTypeSpreadshot'";
    Classes: FGAmmoTypeSpreadshot_Class[];
}
export interface FGBuildableSpaceElevator_Class extends FGBuildableSnowDispenser_Class {
    'mPowerConsumption': string;
    'mPowerConsumptionExponent': string;
    'mDoesHaveShutdownAnimation': string;
    'mOnHasPowerChanged': string;
    'mOnHasProductionChanged': string;
    'mOnHasStandbyChanged': string;
    'mMinimumProducingTime': string;
    'mMinimumStoppedTime': string;
    'mCanEverMonitorProductivity': string;
    'mCanChangePotential': string;
    'mMinPotential': string;
    'mMaxPotential': string;
    'mMaxPotentialIncreasePerCrystal': string;
    'mFluidStackSizeDefault': string;
    'mFluidStackSizeMultiplier': string;
    'OnReplicationDetailActorCreatedEvent': string;
    'mInventoryPotentialHandlerData': string;
    'mEffectUpdateInterval': string;
    'mDefaultProductivityMeasurementDuration': string;
    'mLastProductivityMeasurementProduceDuration': string;
    'mLastProductivityMeasurementDuration': string;
    'mCurrentProductivityMeasurementProduceDuration': string;
    'mCurrentProductivityMeasurementDuration': string;
    'mProductivityMonitorEnabled': string;
    'mCachedSkeletalMeshes': string;
    'mAddToSignificanceManager': string;
    'mSignificanceRange': string;
    'mTickExponent': string;
}
export interface FGBuildableSpaceElevator_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableSpaceElevator'";
    Classes: FGBuildableSpaceElevator_Class[];
}
export interface FGBuildableResourceSinkShop_Class extends FGBuildableSpaceElevator_Class {
    'mShopInventoryDefaultSize': string;
}
export interface FGBuildableResourceSinkShop_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableResourceSinkShop'";
    Classes: FGBuildableResourceSinkShop_Class[];
}
export interface FGBuildableFactorySimpleProducer_Class extends FGBuildableSpaceElevator_Class {
    'mTimeToProduceItem': string;
    'mEventType': string;
}
export interface FGBuildableFactorySimpleProducer_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFactorySimpleProducer'";
    Classes: FGBuildableFactorySimpleProducer_Class[];
}
export interface FGBuildableRadarTower_Class extends FGBuildableSpaceElevator_Class {
    'mMapText': string;
    'mRevealRadius': string;
    'mScannableDescriptors': string;
}
export interface FGBuildableRadarTower_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableRadarTower'";
    Classes: FGBuildableRadarTower_Class[];
}
export interface FGBuildableStorage_Class extends FGBuildableSpaceElevator_Class {
    'mStackingHeight': string;
    'mInventorySizeX': string;
    'mInventorySizeY': string;
}
export interface FGBuildableStorage_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableStorage'";
    Classes: FGBuildableStorage_Class[];
}
export interface FGBuildablePipelineJunction_Class extends FGBuildableSpaceElevator_Class {
    'mRadius': string;
    'mFluidBoxVolume': string;
    'mFluidBox': string;
    'mPipeConnections': string;
}
export interface FGBuildablePipelineJunction_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePipelineJunction'";
    Classes: FGBuildablePipelineJunction_Class[];
}
export interface FGBuildableFactory_Class extends FGBuildableSpaceElevator_Class {
    'JumpForceCharacter': string;
    'JumpForcePhysics': string;
    'mDampeningFactor'?: string;
    'mPlayerList'?: string;
}
export interface FGBuildableFactory_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFactory'";
    Classes: FGBuildableFactory_Class[];
}
export interface FGBuildablePipeReservoir_Class extends FGBuildableSpaceElevator_Class {
    'mStackingHeight': string;
    'mFluidBox': string;
    'mStorageCapacity': string;
    'mPipeConnections': string;
    'mIndicatorData': string;
}
export interface FGBuildablePipeReservoir_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePipeReservoir'";
    Classes: FGBuildablePipeReservoir_Class[];
}
export interface FGBuildableTrainPlatformEmpty_Class extends FGBuildableSpaceElevator_Class {
    'mPlatformConnections': string;
    'mIsOrientationReversed': string;
    'mPlatformDockingStatus': string;
    'mSavedDockingStatus': string;
    'mDockingSequenceTimerHandle': string;
    'mIdleUpdateTimerHandle': string;
    'mDockWasCancelled': string;
}
export interface FGBuildableTrainPlatformEmpty_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableTrainPlatformEmpty'";
    Classes: FGBuildableTrainPlatformEmpty_Class[];
}
export interface FGBuildableResourceSink_Class extends FGBuildableSpaceElevator_Class {
    'IsAnimationProducing': string;
    'EnableTickGrinder': string;
    'EnableTickEngine': string;
    'mGrinderInterpDuration': string;
    'mEngineInterpDuration': string;
    'mCouponInventoryHandler': string;
    'mProcessingTime': string;
    'mProducingTimer': string;
}
export interface FGBuildableResourceSink_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableResourceSink'";
    Classes: FGBuildableResourceSink_Class[];
}
export interface FGBuildableGeneratorGeoThermal_Class extends FGBuildableSpaceElevator_Class {
    'mProductionEffectsRunning': string;
    'mVariablePowerProductionConstant': string;
    'mVariablePowerProductionFactor': string;
    'mVariablePowerProductionCycleLength': string;
    'mMinPowerProduction': string;
    'mMaxPowerProduction': string;
    'mVariablePowerProductionCycleOffset': string;
    'mPowerProduction': string;
    'mLoadPercentage': string;
}
export interface FGBuildableGeneratorGeoThermal_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableGeneratorGeoThermal'";
    Classes: FGBuildableGeneratorGeoThermal_Class[];
}
export interface FGBuildablePowerStorage_Class extends FGBuildableSpaceElevator_Class {
    'm_PreviousBatteryStatus': string;
    'mCurrentGameTimeSinceStateChange': string;
    'mActivationEventID': string;
    'mBatteryStatus': string;
    'mPowerStore': string;
    'mPowerStoreCapacity': string;
    'mPowerInputCapacity': string;
    'mIndicatorLevelMax': string;
    'mIndicatorLevel': string;
}
export interface FGBuildablePowerStorage_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePowerStorage'";
    Classes: FGBuildablePowerStorage_Class[];
}
export interface FGAmmoTypeProjectile_Class extends FGItemDescriptor_Class {
    'mInitialProjectileSpeedOverride': string;
    'mProjectileMaxSpeedOverride': string;
    'mProjectileHealthOverride': string;
    'mProjectileLifespan': string;
    'mProjectileStickspan': string;
    'mCanTakeDamageBySameProjectileOrChild': string;
    'mDamageTypesAtEndOfLife': string;
    'mGravityScaleOverLifespan': string;
    'mHomingProjectile': string;
    'mHomingNeedsValidTarget': string;
    'mMaxHomingAccelerationMagnitudeOverride': string;
    'mHomingMagnitudeMultiplierOverLifespan': string;
    'mHomingMagnitudeMultiplierOverDistanceToTarget': string;
    'mHomingOverlapSize': string;
    'mHomingAngleLimit': string;
    'mHomingOverrideTargets': string;
    'AmmoFiredDelegate': string;
    'mFiringTransform': string;
    'mFiringDirection': string;
    'mMagazineSize': string;
    'mMaxAmmoEffectiveRange': string;
    'mReloadTimeMultiplier': string;
    'mFireRate': string;
    'mFiringTransformIgnoresDispersion': string;
    'mDispersionFireRateMultiplier': string;
    'mDispersionPerShot': string;
    'mRestingDispersion': string;
    'mFiringDispersion': string;
    'mDispersionRecoveryTime': string;
    'mHasBeenInitialized': string;
    'mWeaponDamageMultiplier': string;
    'mMagazineMeshMaterials': string;
    'mMagazineMeshMaterials1p': string;
    'mDamageTypesOnImpact': string;
    'mAmmoDamageFalloff': string;
    'mMuzzleFlashScale': string;
    'mFiringSounds': string;
    'mFiringSounds1P': string;
    'mAmmoColor': string;
    'mAmmoScale': string;
    'mAmmoTickFunction': string;
}
export interface FGAmmoTypeProjectile_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGAmmoTypeProjectile'";
    Classes: FGAmmoTypeProjectile_Class[];
}
export interface FGPipeHyperStart_Class extends FGBuildableSpaceElevator_Class {
    'mWindDirectionFromTurbine': string;
    'mIsWindSoundPlaying?': string;
    'mAudioTimerCounter': string;
    'AudioCounterTimer': string;
    'IsEnginePlaying': string;
    'mOpeningOffset': string;
    'mInitialMinSpeedFactor': string;
    'mLength': string;
    'mCanStack': string;
    'mStackHeight': string;
    'mUseStaticHeight': string;
}
export interface FGPipeHyperStart_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGPipeHyperStart'";
    Classes: FGPipeHyperStart_Class[];
}
export interface FGBuildableFrackingExtractor_Class extends FGBuildableSpaceElevator_Class {
    'mExtractStartupTime': string;
    'mExtractStartupTimer': string;
    'mExtractCycleTime': string;
    'mItemsPerCycle': string;
    'mPipeOutputConnections': string;
    'mReplicatedFlowRate': string;
    'mAllowedResourceForms': string;
    'mOnlyAllowCertainResources': string;
    'mAllowedResources': string;
    'mExtractorTypeName': string;
    'mTryFindMissingResource': string;
}
export interface FGBuildableFrackingExtractor_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFrackingExtractor'";
    Classes: FGBuildableFrackingExtractor_Class[];
}
export interface FGBuildableRailroadStation_Class extends FGBuildableTrainPlatformEmpty_Class {
    'mMapText': string;
    'mShouldTeleportHere': string;
    'mDockedPlatformList': string;
    'mCurrentDockedWithRuleSet': string;
    'mCurrentDockForDuration': string;
}
export interface FGBuildableRailroadStation_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableRailroadStation'";
    Classes: FGBuildableRailroadStation_Class[];
}
export interface FGBuildableFrackingActivator_Class extends FGBuildableSpaceElevator_Class {
    'CurrentPotentialChangedDelegate': string;
    'ConnectedExtractorCountChangedDelegate': string;
    'mActivationStartupTime': string;
    'mActivationStartupTimer': string;
    'mSatelliteActivationComplete': string;
    'mSatelliteNodeCount': string;
    'mConnectedExtractorCount': string;
    'mDefaultPotentialExtractionPerMinute': string;
    'mAllowedResourceForms': string;
    'mOnlyAllowCertainResources': string;
    'mAllowedResources': string;
    'mExtractorTypeName': string;
    'mTryFindMissingResource': string;
}
export interface FGBuildableFrackingActivator_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableFrackingActivator'";
    Classes: FGBuildableFrackingActivator_Class[];
}
export interface FGBuildableWaterPump_Class extends FGBuildableFrackingExtractor_Class {
    'mWaterpumpTimeline_RTPC_B8FA6F944E717E3B7A286E84901F620E': string;
    'mWaterpumpTimeline__Direction_B8FA6F944E717E3B7A286E84901F620E': string;
    'HasLostSignificance': string;
    'mMinimumDepthForPlacement': string;
    'mDepthTraceOriginOffset': string;
}
export interface FGBuildableWaterPump_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableWaterPump'";
    Classes: FGBuildableWaterPump_Class[];
}
export interface FGBuildableResourceExtractor_Class extends FGBuildableFrackingExtractor_Class {
    'mParticleMap'?: string;
    'mCanPlayAfterStartUpStopped'?: string;
    'mInternalMiningState_0'?: string;
    'mToggleMiningStateHandle_0'?: string;
    'mMinimumDrillTime_0'?: string;
    'mMaximumDrillTime_0'?: string;
    'CanPlayAfterStartUpStopped'?: string;
}
export interface FGBuildableResourceExtractor_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableResourceExtractor'";
    Classes: FGBuildableResourceExtractor_Class[];
}
export interface FGBuildableTradingPost_Class extends FGBuildableSpaceElevator_Class {
    'mWorkBenchOccupied': string;
    'mWorkBenchFree': string;
    'Meshes': string;
    'mShipUpgradeLevel': string;
    'mStorageText': string;
    'mMamFreeText': string;
    'mMamOccupiedText': string;
    'mMeshes': string;
    'ABClass': string;
    'mSkeletalMeshSoftPtr': string;
    'mGenerators': string;
    'mStorageInventorySize': string;
    'mStorageVisibilityLevel': string;
    'mSpawningGroundZOffset': string;
    'mGroundSearchZDistance': string;
    'mDefaultResources': string;
    'mNeedPlayingBuildEffectNotification': string;
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
    'mMinimumDockingTime': string;
    'mStorageSizeX': string;
    'mStorageSizeY': string;
    'mFuelInventorySizeX': string;
    'mFuelInventorySizeY': string;
    'mTransferSpeed': string;
    'mFuelTransferSpeed': string;
    'mFuelInventoryHandlerData': string;
    'mInventoryHandlerData': string;
    'mStackTransferSize': string;
    'mForceSignificance': string;
    'mVehicleFuelConsumptionRate': string;
    'mItemTransferRate': string;
    'mMaximumStackTransferRate': string;
    'mDockingVehicleStatistics': string;
}
export interface FGBuildableDockingStation_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableDockingStation'";
    Classes: FGBuildableDockingStation_Class[];
}
export interface FGBuildableGeneratorNuclear_Class extends FGBuildableSpaceElevator_Class {
    'mCachedLoadPercentage': string;
    'mOutputInventoryHandlerData': string;
    'mWasteLeftFromCurrentFuel': string;
    'mCurrentGeneratorNuclearWarning': string;
    'mFuelInventoryHandlerData': string;
    'mFuelClasses': string;
    'mDefaultFuelClasses': string;
    'mFuel': {
        mFuelClass: string;
        mSupplementalResourceClass: string;
        mByproduct: string;
        mByproductAmount: string;
    }[];
    'mAvailableFuelClasses': string;
    'mFuelResourceForm': string;
    'mFuelLoadAmount': string;
    'mRequiresSupplementalResource': string;
    'mSupplementalLoadAmount': string;
    'mSupplementalToPowerRatio': string;
    'mIsFullBlast': string;
    'mCachedInputConnections': string;
    'mCachedPipeInputConnections': string;
    'mPowerProduction': string;
    'mLoadPercentage': string;
}
export interface FGBuildableGeneratorNuclear_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableGeneratorNuclear'";
    Classes: FGBuildableGeneratorNuclear_Class[];
}
export interface FGBuildablePipelinePump_Class extends FGBuildablePipelineJunction_Class {
    'mLastFlowUpdate': string;
    'mUpdateFlowTime': string;
    'mAnimSpeed': string;
    'mLastFlowValue': string;
    'mTimeScaleOffset': string;
    'mIsPipePumpPlaying': string;
    'mIsExceedingHeadLift': string;
    'mCurrentAudioHeadLift': string;
    'mMaxPressure': string;
    'mDesignPressure': string;
    'mDefaultFlowLimit': string;
    'mUserFlowLimit': string;
    'mMinimumFlowPercentForStandby': string;
    'mIndicatorData': string;
    'mPistonAudioTimer'?: string;
}
export interface FGBuildablePipelinePump_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildablePipelinePump'";
    Classes: FGBuildablePipelinePump_Class[];
}
export interface FGBuildableGeneratorFuel_Class extends FGBuildableSpaceElevator_Class {
    'm_SFXSockets': string;
    'm_CurrentPotential': string;
    'mFuelInventoryHandlerData': string;
    'mFuelClasses': string;
    'mDefaultFuelClasses': string;
    'mFuel': {
        mFuelClass: string;
        mSupplementalResourceClass: string;
        mByproduct: string;
        mByproductAmount: string;
    }[];
    'mAvailableFuelClasses': string;
    'mFuelResourceForm': string;
    'mFuelLoadAmount': string;
    'mRequiresSupplementalResource': string;
    'mSupplementalLoadAmount': string;
    'mSupplementalToPowerRatio': string;
    'mIsFullBlast': string;
    'mCachedInputConnections': string;
    'mCachedPipeInputConnections': string;
    'mPowerProduction': string;
    'mLoadPercentage': string;
    'mRTPCInterval'?: string;
    'mCachedLoadPercentage'?: string;
}
export interface FGBuildableGeneratorFuel_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableGeneratorFuel'";
    Classes: FGBuildableGeneratorFuel_Class[];
}
export interface FGBuildableJumppad_Class extends FGBuildableSpaceElevator_Class {
    'mPowerBankCapacity': string;
    'mLaunchPowerCost': string;
    'mChargeRateMultiplier': string;
    'mCurrentPowerLevel': string;
    'mLaunchVelocity': string;
    'mLaunchAngle': string;
    'mPlayerChainJumpResetTime': string;
    'mHasPowerForLaunch': string;
    'ComponentsToLaunch': string;
    'CharactersToLaunch': string;
    'VehiclesToLaunch': string;
    'mTrajectoryData': string;
    'mTrajectoryMeshScale': string;
    'mTrajectoryMeshRotation': string;
    'mDestinationMeshHeightOffset': string;
    'mTrajectorySplineMeshNumPrimitiveDataFloats': string;
    'mTrajectorySplineMeshSplineDataSettings': string;
    'mNumArrows': string;
    'mKillTimer': string;
    'mTrajectoryGravityMultiplier': string;
    'mShowTrajectoryCounter': string;
}
export interface FGBuildableJumppad_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableJumppad'";
    Classes: FGBuildableJumppad_Class[];
}
export interface FGBuildableManufacturerVariablePower_Class extends FGBuildableSpaceElevator_Class {
    'IsPowered': string;
    'mSequenceDuration': string;
    'mLightningTimer': string;
    'mGameTimeAtProducing': string;
    'mCurrentProducingSeekTime': string;
    'mStartVector_VFX_Small_Start': string;
    'mStartVector_VFX_Small_End': string;
    'mStartVector_VFX_Medium_Start': string;
    'mStartVector_VFX_Medium_End': string;
    'mStartVector_VFX_Large_Start': string;
    'mStartVector_VFX_Large_End': string;
    'mEstimatedMininumPowerConsumption': string;
    'mEstimatedMaximumPowerConsumption': string;
    'mCurrentRecipeChanged': string;
    'mManufacturingSpeed': string;
    'mFactoryInputConnections': string;
    'mPipeInputConnections': string;
    'mFactoryOutputConnections': string;
    'mPipeOutputConnections': string;
    'mInputInventoryHandlerData': string;
    'mOutputInventoryHandlerData': string;
}
export interface FGBuildableManufacturerVariablePower_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableManufacturerVariablePower'";
    Classes: FGBuildableManufacturerVariablePower_Class[];
}
export interface FGBuildableManufacturer_Class extends FGBuildableSpaceElevator_Class {
    'IsPowered': string;
    'mProductionEffectsRunning': string;
    'mCurrentRecipeChanged': string;
    'mManufacturingSpeed': string;
    'mFactoryInputConnections': string;
    'mPipeInputConnections': string;
    'mFactoryOutputConnections': string;
    'mPipeOutputConnections': string;
    'mInputInventoryHandlerData': string;
    'mOutputInventoryHandlerData': string;
    'bIsPendingToKillVfx'?: string;
    'mCurrentColor_VFX'?: string;
    'CurrentPackagingMode'?: string;
    'mCurrentColorVFX'?: string;
    'm_NotifyNameREferences'?: string;
    'mColor'?: string;
    'mIsRadioActive'?: string;
    'mStoppedProducingAnimationSounds'?: string;
    'mStoppedAkComponents'?: string;
    'mSocketStoppedAkComponents'?: string;
    'mIsPendingToKillVFX'?: string;
    'mCachedCurrentPotential'?: string;
    'mCurrentRecipeCheck'?: string;
    'mPreviousRecipeCheck'?: string;
    'CurrentPotentialConvert'?: string;
}
export interface FGBuildableManufacturer_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableManufacturer'";
    Classes: FGBuildableManufacturer_Class[];
}
export interface FGBuildableDroneStation_Class extends FGBuildableSpaceElevator_Class {
    'mStoppedProducingAnimationSounds': string;
    'mStoppedAkComponents': string;
    'mSocketStoppedAkComponents': string;
    'm_DockingStates': string;
    'm_OffsetTime': string;
    'mDroneDockingStartLocationLocal': string;
    'mDroneDockingLocationLocal': string;
    'mBatteryClasses': string;
    'mDroneDockingQueue': string;
    'mStationHasDronesInQueue': string;
    'mItemTransferringStage': string;
    'mTransferProgress': string;
    'mTransferSpeed': string;
    'mStackTransferSize': string;
    'mDroneQueueRadius': string;
    'mDroneQueueSeparationRadius': string;
    'mDroneQueueVerticalSeparation': string;
    'mTripPowerCost': string;
    'mTripPowerPerMeterCost': string;
    'mTripInformationSampleCount': string;
    'mStorageSizeX': string;
    'mStorageSizeY': string;
    'mBatteryStorageSizeX': string;
    'mBatteryStorageSizeY': string;
    'mInputInventoryHandler': string;
    'mOutputInventoryHandler': string;
    'mBatteryInventoryHandler': string;
    'mMapText': string;
}
export interface FGBuildableDroneStation_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableDroneStation'";
    Classes: FGBuildableDroneStation_Class[];
}
export interface FGBuildableTrainPlatformCargo_Class extends FGBuildableTrainPlatformEmpty_Class {
    'mOnTransferRateUpdated': string;
    'mFreightCargoType': string;
    'mStorageSizeX': string;
    'mStorageSizeY': string;
    'mCanUnloadAny': string;
    'mIsFullUnload': string;
    'mCanLoadAny': string;
    'mIsFullLoad': string;
    'mTimeToCompleteLoad': string;
    'mTimeToSwapLoadVisibility': string;
    'mTimeToCompleteUnload': string;
    'mTimeToSwapUnloadVisibility': string;
    'mWaitForConditionUpdatePeriod': string;
    'mStorageInputConnections': string;
    'mPipeInputConnections': string;
    'mPipeOutputConnections': string;
    'mDockingRuleSet': string;
    'mLoadItemFilter': string;
    'mUnloadItemFilter': string;
    'mHasFullyLoadUnloadRule': string;
    'mDockForDuration': string;
    'mMustDockForDuration': string;
    'mCurrentDockForDuration': string;
    'mHasAnyRelevantStacksToMove': string;
    'mAllowDepartureNoValidItemsToTransfer': string;
    'mShouldExecuteLoadOrUnload': string;
    'mRanCompleteBeforeNone': string;
    'mSwapCargoVisibilityTimerHandle': string;
    'mTimeSinceLastLoadTransferUpdate': string;
    'mTimeSinceLastUnloadTransferUpdate': string;
    'mSmoothedLoadRate': string;
    'mSmoothedUnloadRate': string;
    'mReplicatedOutflowRate': string;
    'mReplicatedInflowRate': string;
}
export interface FGBuildableTrainPlatformCargo_Parent {
    NativeClass: "/Script/CoreUObject.Class'/Script/FactoryGame.FGBuildableTrainPlatformCargo'";
    Classes: FGBuildableTrainPlatformCargo_Class[];
}


export type Docs = ("FGBuildableTrainPlatformCargo_Parent" | "FGBuildableDroneStation_Parent" | "FGBuildableManufacturer_Parent" | "FGBuildableManufacturerVariablePower_Parent" | "FGBuildableJumppad_Parent" | "FGBuildableGeneratorFuel_Parent" | "FGBuildablePipelinePump_Parent" | "FGBuildableGeneratorNuclear_Parent" | "FGBuildableDockingStation_Parent" | "FGBuildableTradingPost_Parent" | "FGBuildableResourceExtractor_Parent" | "FGBuildableWaterPump_Parent" | "FGBuildableFrackingActivator_Parent" | "FGBuildableRailroadStation_Parent" | "FGBuildableFrackingExtractor_Parent" | "FGPipeHyperStart_Parent" | "FGAmmoTypeProjectile_Parent" | "FGBuildablePowerStorage_Parent" | "FGBuildableGeneratorGeoThermal_Parent" | "FGBuildableResourceSink_Parent" | "FGBuildableTrainPlatformEmpty_Parent" | "FGBuildablePipeReservoir_Parent" | "FGBuildableFactory_Parent" | "FGBuildablePipelineJunction_Parent" | "FGBuildableStorage_Parent" | "FGBuildableRadarTower_Parent" | "FGBuildableFactorySimpleProducer_Parent" | "FGBuildableResourceSinkShop_Parent" | "FGBuildableSpaceElevator_Parent" | "FGAmmoTypeSpreadshot_Parent" | "FGAmmoTypeInstantHit_Parent" | "FGBuildablePipeline_Parent" | "FGBuildableWidgetSign_Parent" | "FGHoverPack_Parent" | "FGBuildableDoor_Parent" | "FGBuildablePriorityPowerSwitch_Parent" | "FGWeapon_Parent" | "FGChargedWeapon_Parent" | "FGBuildableRailroadTrack_Parent" | "FGBuildableRailroadSignal_Parent" | "FGBuildableCircuitSwitch_Parent" | "FGBuildableBlueprintDesigner_Parent" | "FGBuildablePassthrough_Parent" | "FGBuildablePassthroughPipeHyper_Parent" | "FGBuildableRamp_Parent" | "FGBuildableConveyorLift_Parent" | "FGBuildableSplitterSmart_Parent" | "FGBuildableLightsControlPanel_Parent" | "FGBuildableConveyorBelt_Parent" | "FGBuildableWire_Parent" | "FGBuildableFoundation_Parent" | "FGBuildableFoundationLightweight_Parent" | "FGBuildableLightSource_Parent" | "FGBuildableFloodlight_Parent" | "FGBuildableWallLightweight_Parent" | "FGBuildableWall_Parent" | "FGBuildablePoleLightweight_Parent" | "FGBuildablePipelineSupport_Parent" | "FGConveyorPoleStackable_Parent" | "FGBuildableLadder_Parent" | "FGBuildablePowerPole_Parent" | "FGBuildableBeamLightweight_Parent" | "FGBuildableCornerWall_Parent" | "FGBuildableWalkwayLightweight_Parent" | "FGBuildableWalkway_Parent" | "FGBuildablePipeHyper_Parent" | "FGBuildableMAM_Parent" | "FGBuildableStair_Parent" | "FGBuildable_Parent" | "FGBuildablePillarLightweight_Parent" | "FGResourceDescriptor_Parent" | "FGConsumableDescriptor_Parent" | "FGBuildableAttachmentMerger_Parent" | "FGBuildableAttachmentSplitter_Parent" | "FGBuildableSnowDispenser_Parent" | "FGBuildableFactoryBuilding_Parent" | "FGItemDescriptorNuclearFuel_Parent" | "FGVehicleDescriptor_Parent" | "FGObjectScanner_Parent" | "FGJetPack_Parent" | "FGChainsaw_Parent" | "FGItemDescriptor_Parent" | "FGSchematic_Parent" | "FGEquipmentDescriptor_Parent" | "FGItemDescriptorBiomass_Parent" | "FGBuildingDescriptor_Parent" | "FGPoleDescriptor_Parent" | "FGSuitBase_Parent" | "FGEquipmentZipline_Parent" | "FGEquipmentStunSpear_Parent" | "FGGasMask_Parent" | "FGGolfCartDispenser_Parent" | "FGConsumableEquipment_Parent" | "FGParachute_Parent" | "FGPortableMinerDispenser_Parent" | "FGJumpingStilts_Parent" | "FGCustomizationRecipe_Parent" | "FGRecipe_Parent" | "Generic_Parent")[];

export default Docs;