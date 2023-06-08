# 应用页面交互入口

## 工程结构

```

./
├── App.tsx                     -- 应用界面入口
├── apis
│   ├── ApiErrorManager.tsx
│   ├── apiKeys.ts
│   ├── axiosInstance.ts
│   ├── requests
│   │   ├── actuator
│   │   │   └── testConnectionByUrl.ts
│   │   ├── application
│   │   │   ├── authentication
│   │   │   │   └── getApplicationEffectiveAuthentication.ts
│   │   │   ├── caches
│   │   │   │   ├── evictAllApplicationCaches.ts
│   │   │   │   ├── evictApplicationCache.ts
│   │   │   │   ├── evictApplicationCaches.ts
│   │   │   │   ├── getApplicationCacheStatistics.ts
│   │   │   │   └── getApplicationCaches.ts
│   │   │   ├── getApplicationAbilities.ts
│   │   │   ├── getApplicationInstances.ts
│   │   │   ├── health
│   │   │   │   └── getApplicationsHealth.ts
│   │   │   ├── loggers
│   │   │   │   ├── getApplicationLoggers.ts
│   │   │   │   └── setApplicationLoggerLevel.ts
│   │   │   └── moveApplication.ts
│   │   ├── base
│   │   │   ├── useBaseMutation.ts
│   │   │   └── useBaseQuery.ts
│   │   ├── crud
│   │   │   ├── base
│   │   │   │   ├── useCrudMutation.ts
│   │   │   │   └── useCrudQuery.ts
│   │   │   ├── crudCreate.ts
│   │   │   ├── crudCreateBulk.ts
│   │   │   ├── crudDelete.ts
│   │   │   ├── crudKeys.ts
│   │   │   ├── crudSearch.ts
│   │   │   ├── crudSearchCount.ts
│   │   │   ├── crudShow.ts
│   │   │   ├── crudUpdate.ts
│   │   │   ├── entity
│   │   │   │   ├── entities
│   │   │   │   │   ├── application.crudEntity.ts
│   │   │   │   │   ├── folder.crudEntity.ts
│   │   │   │   │   ├── heapdumpReference.crudEntity.ts
│   │   │   │   │   ├── instance.crudEntity.ts
│   │   │   │   │   └── threadProfilingRequest.crudEntity.ts
│   │   │   │   └── entity.d.ts
│   │   │   └── types
│   │   │       ├── crud-framework
│   │   │       │   ├── crudFrameworkCreate.ts
│   │   │       │   ├── crudFrameworkCreateBulk.ts
│   │   │       │   ├── crudFrameworkDelete.ts
│   │   │       │   ├── crudFrameworkMethods.ts
│   │   │       │   ├── crudFrameworkSearch.ts
│   │   │       │   ├── crudFrameworkSearchCount.ts
│   │   │       │   ├── crudFrameworkShow.ts
│   │   │       │   └── crudFrameworkUpdate.ts
│   │   │       └── crud.ts
│   │   ├── demo
│   │   │   ├── createDemo.ts
│   │   │   └── deleteDemo.ts
│   │   ├── folder
│   │   │   ├── authentication
│   │   │   │   └── getFolderEffectiveAuthentication.ts
│   │   │   ├── getFolderApplications.ts
│   │   │   └── moveFolder.ts
│   │   ├── instance
│   │   │   ├── beans
│   │   │   │   └── getInstanceBeans.ts
│   │   │   ├── caches
│   │   │   │   ├── evictAllInstanceCaches.ts
│   │   │   │   ├── evictInstanceCache.ts
│   │   │   │   ├── evictInstanceCaches.ts
│   │   │   │   ├── getInstanceCacheStatistics.ts
│   │   │   │   └── getInstanceCaches.ts
│   │   │   ├── env
│   │   │   │   ├── getInstanceEnv.ts
│   │   │   │   ├── getInstanceEnvProperties.ts
│   │   │   │   ├── getInstanceSystemEnvironment.ts
│   │   │   │   └── getInstanceSystemProperties.ts
│   │   │   ├── flyway
│   │   │   │   ├── getInstanceFlyway.ts
│   │   │   │   └── getInstanceFlywayMigrations.ts
│   │   │   ├── getInstanceAbilities.ts
│   │   │   ├── health
│   │   │   │   ├── fetchInstanceHealth.ts
│   │   │   │   ├── getInstancesHealth.ts
│   │   │   │   └── updateInstanceHealth.ts
│   │   │   ├── heapdumps
│   │   │   │   ├── deleteInstanceHeapdumpReference.ts
│   │   │   │   ├── downloadInstanceHeapdumpReference.ts
│   │   │   │   ├── getInstanceHeapdumpReferences.ts
│   │   │   │   └── requestInstanceHeapdump.ts
│   │   │   ├── http-requests
│   │   │   │   ├── getInstanceHttpRequestStatistics.ts
│   │   │   │   ├── getInstanceHttpRequestStatisticsForUriByExceptions.ts
│   │   │   │   ├── getInstanceHttpRequestStatisticsForUriByMethods.ts
│   │   │   │   ├── getInstanceHttpRequestStatisticsForUriByOutcomes.ts
│   │   │   │   └── getInstanceHttpRequestStatisticsForUriByStatuses.ts
│   │   │   ├── integration-graph
│   │   │   │   └── getInstanceIntegrationGraph.ts
│   │   │   ├── liquibase
│   │   │   │   ├── getInstanceLiquibase.ts
│   │   │   │   └── getInstanceLiquibaseChangesets.ts
│   │   │   ├── loggers
│   │   │   │   ├── getInstanceLoggers.ts
│   │   │   │   └── setInstanceLoggerLevel.ts
│   │   │   ├── mappings
│   │   │   │   ├── getInstanceMappings.ts
│   │   │   │   ├── getInstanceMappingsDispatcherHandlers.ts
│   │   │   │   ├── getInstanceMappingsDispatcherServlets.ts
│   │   │   │   ├── getInstanceMappingsServletFilters.ts
│   │   │   │   └── getInstanceMappingsServlets.ts
│   │   │   ├── metrics
│   │   │   │   ├── getInstanceMetricDetails.ts
│   │   │   │   └── getInstanceMetrics.ts
│   │   │   ├── moveInstance.ts
│   │   │   ├── properties
│   │   │   │   └── getInstanceProperties.ts
│   │   │   ├── quartz
│   │   │   │   ├── getInstanceQuartz.ts
│   │   │   │   ├── getInstanceQuartzJobDetails.ts
│   │   │   │   ├── getInstanceQuartzJobs.ts
│   │   │   │   ├── getInstanceQuartzTriggerDetails.ts
│   │   │   │   └── getInstanceQuartzTriggers.ts
│   │   │   ├── scheduled-tasks
│   │   │   │   ├── getInstanceScheduledTasks.ts
│   │   │   │   ├── getInstanceScheduledTasksCron.ts
│   │   │   │   ├── getInstanceScheduledTasksCustom.ts
│   │   │   │   ├── getInstanceScheduledTasksFixed.ts
│   │   │   │   ├── getInstanceScheduledTasksFixedDelay.ts
│   │   │   │   └── getInstanceScheduledTasksFixedRate.ts
│   │   │   ├── thread-profiling
│   │   │   │   ├── deleteInstanceThreadProfiling.ts
│   │   │   │   ├── getInstanceThreadProfilingRequestLogs.ts
│   │   │   │   ├── getInstanceThreadProfilingRequests.ts
│   │   │   │   └── requestInstanceThreadProfiling.ts
│   │   │   └── togglz
│   │   │       ├── getInstanceTogglz.ts
│   │   │       └── updateInstanceTogglzFeature.ts
│   │   ├── item
│   │   │   ├── createItem.ts
│   │   │   ├── deleteItem.ts
│   │   │   ├── getItemAbilities.ts
│   │   │   ├── moveItem.ts
│   │   │   └── updateItem.ts
│   │   ├── metrics
│   │   │   └── getLatestMetric.ts
│   │   ├── subscriptions
│   │   │   └── subscribeToEvent.ts
│   │   └── ui
│   │       ├── closeWindow.ts
│   │       ├── getTheme.ts
│   │       ├── getThemeSource.ts
│   │       ├── maximizeWindow.ts
│   │       ├── minimizeWindow.ts
│   │       ├── restartApp.ts
│   │       └── setThemeSource.ts
│   ├── useCreateQueryClient.ts
│   └── websockets
│       ├── StompContext.tsx
│       └── stompTopics.ts
├── components
│   ├── chart
│   │   ├── BaseOptionChart.tsx
│   │   └── ChartStyle.tsx
│   ├── code
│   │   ├── CodeEditor.tsx
│   │   ├── CodeStyle.tsx
│   │   ├── InlineCodeLabel.tsx
│   │   ├── Markdown.tsx
│   │   └── extensions
│   │       ├── indentFoldingExtension.ts
│   │       └── searchHighlightExtension.ts
│   ├── common
│   │   ├── IconViewer.tsx
│   │   ├── Label.tsx
│   │   ├── Logo.tsx
│   │   ├── LogoLoader.tsx
│   │   ├── MAvatar.tsx
│   │   ├── ScreenLoader.tsx
│   │   ├── SearchToolbar.tsx
│   │   └── ToolbarButton.tsx
│   ├── dialog
│   │   ├── ConfirmationDialog.tsx
│   │   ├── ConfirmationTypingDialog.tsx
│   │   ├── DialogTitleEnhanced.tsx
│   │   └── PasswordDialog.tsx
│   ├── format
│   │   ├── FormattedBoolean.tsx
│   │   ├── FormattedCron.tsx
│   │   ├── FormattedDateAndRelativeTime.tsx
│   │   ├── FormattedInterval.tsx
│   │   ├── FormattedParsedDate.tsx
│   │   └── FormattedRelativeTimeNow.tsx
│   ├── help
│   │   ├── EmptyContent.tsx
│   │   ├── HelpIcon.tsx
│   │   └── RedactionAlert.tsx
│   ├── input
│   │   └── SearchTextField.tsx
│   ├── item
│   │   ├── ItemHeader.tsx
│   │   ├── authentication
│   │   │   ├── effective
│   │   │   │   ├── EffectiveAuthenticationDetails.tsx
│   │   │   │   ├── EffectiveAuthenticationDetailsBasic.tsx
│   │   │   │   ├── EffectiveAuthenticationDetailsBearer.tsx
│   │   │   │   ├── EffectiveAuthenticationDetailsHeader.tsx
│   │   │   │   ├── EffectiveAuthenticationDetailsInherit.tsx
│   │   │   │   ├── EffectiveAuthenticationDetailsNone.tsx
│   │   │   │   └── EffectiveAuthenticationDetailsQuerystring.tsx
│   │   │   ├── forms
│   │   │   │   ├── AuthenticationDetailsForm.tsx
│   │   │   │   ├── AuthenticationDetailsFormBasic.tsx
│   │   │   │   ├── AuthenticationDetailsFormBearer.tsx
│   │   │   │   ├── AuthenticationDetailsFormHeader.tsx
│   │   │   │   ├── AuthenticationDetailsFormInherit.tsx
│   │   │   │   ├── AuthenticationDetailsFormNone.tsx
│   │   │   │   └── AuthenticationDetailsFormQuerystring.tsx
│   │   │   └── hooks
│   │   │       └── useEffectiveAuthentication.ts
│   │   ├── cache
│   │   │   ├── ItemCacheDetails.tsx
│   │   │   └── ItemCacheStatisticsDialog.tsx
│   │   ├── data-collection
│   │   │   ├── ApplicationDataCollectionToggle.tsx
│   │   │   ├── DataCollectionToggle.tsx
│   │   │   └── InstanceDataCollectionToggle.tsx
│   │   ├── dialogs
│   │   │   ├── create
│   │   │   │   ├── CreateApplicationDialog.tsx
│   │   │   │   ├── CreateFolderDialog.tsx
│   │   │   │   └── CreateInstanceDialog.tsx
│   │   │   ├── forms
│   │   │   │   ├── ApplicationDetailsForm.tsx
│   │   │   │   ├── FolderDetailsForm.tsx
│   │   │   │   ├── InstanceDetailsForm.tsx
│   │   │   │   └── fields
│   │   │   │       ├── ItemIconFormField.tsx
│   │   │   │       └── ItemIconMenu.tsx
│   │   │   └── update
│   │   │       ├── UpdateApplicationDialog.tsx
│   │   │       ├── UpdateFolderDialog.tsx
│   │   │       └── UpdateInstanceDialog.tsx
│   │   └── logger
│   │       ├── CustomLogLevelDialog.tsx
│   │       ├── LogLevelToggleGroup.tsx
│   │       └── LoggerCustomFiltersComponent.tsx
│   ├── layout
│   │   ├── LoadingPage.tsx
│   │   ├── MHidden.tsx
│   │   ├── Page.tsx
│   │   └── TabPanel.tsx
│   ├── managers
│   │   ├── AnalyticsEventsManager.tsx
│   │   ├── AppUpdatesManager.tsx
│   │   ├── NewVersionManager.tsx
│   │   └── NotificationsManager.tsx
│   ├── menu
│   │   ├── item
│   │   │   └── CustomMenuItem.tsx
│   │   ├── popup
│   │   │   ├── ContextMenuContext.tsx
│   │   │   ├── ContextMenuPopper.tsx
│   │   │   ├── MenuPopover.tsx
│   │   │   └── useMenuPaperStyle.ts
│   │   └── sidebar
│   │       ├── Sidebar.tsx
│   │       ├── SidebarItem.tsx
│   │       └── SidebarSection.tsx
│   ├── snackbar
│   │   └── NotistackProvider.tsx
│   ├── table
│   │   ├── TableComponent.tsx
│   │   ├── TableContext.tsx
│   │   ├── TableCustom.tsx
│   │   ├── TableHeadCustom.tsx
│   │   ├── TableNoData.tsx
│   │   ├── TableRowCustom.tsx
│   │   ├── TableSelectedActions.tsx
│   │   ├── TableSkeleton.tsx
│   │   ├── TableToolbar.tsx
│   │   ├── action
│   │   │   ├── TableRowAction.tsx
│   │   │   ├── TableRowActionDetails.tsx
│   │   │   └── TableRowActionNavigate.tsx
│   │   ├── data
│   │   │   ├── TableCellData.tsx
│   │   │   ├── TableCellDataBytes.tsx
│   │   │   ├── TableCellDataCountdown.tsx
│   │   │   ├── TableCellDataCron.tsx
│   │   │   ├── TableCellDataCustom.tsx
│   │   │   ├── TableCellDataCustomText.tsx
│   │   │   ├── TableCellDataDate.tsx
│   │   │   ├── TableCellDataInterval.tsx
│   │   │   ├── TableCellDataLabel.tsx
│   │   │   ├── TableCellDataNumber.tsx
│   │   │   ├── TableCellDataParsedDate.tsx
│   │   │   ├── TableCellDataText.tsx
│   │   │   └── custom
│   │   │       ├── TableCellDataApplicationLoggerLevel.tsx
│   │   │       ├── TableCellDataFlywayMigrationVersion.tsx
│   │   │       ├── TableCellDataHealthStatus.tsx
│   │   │       ├── TableCellDataInstanceLoggerLevel.tsx
│   │   │       └── TableCellDataInstanceTogglzToggle.tsx
│   │   └── details
│   │       ├── DetailsLabelValueHorizontal.tsx
│   │       ├── DetailsLabelValueVertical.tsx
│   │       └── TableDetailsChart.tsx
│   └── widget
│       ├── DashboardWidget.tsx
│       ├── card
│       │   ├── CountdownDashboardWidget.tsx
│       │   ├── DashboardGenericCard.tsx
│       │   ├── DataBarDashboardWidget.tsx
│       │   ├── HealthStatusDashboardWidget.tsx
│       │   ├── NotSupportedDashboardWidget.tsx
│       │   ├── PercentCircleDashboardWidget.tsx
│       │   ├── ProgressCircleDashboardWidget.tsx
│       │   └── StackedTimelineDashboardWidget.tsx
│       ├── hooks
│       │   ├── useWidgetErrorMetrics.tsx
│       │   ├── useWidgetLatestMetrics.ts
│       │   └── useWidgetSubscribeToMetrics.ts
│       ├── metric
│       │   ├── CountdownValue.tsx
│       │   └── MetricValue.tsx
│       ├── pure
│       │   ├── AreaMultiple.tsx
│       │   ├── DonutMultiple.tsx
│       │   └── RadialBarSingle.tsx
│       └── widget.d.ts
├── constants
│   ├── icons.ts
│   ├── ids.ts
│   ├── regex.ts
│   └── ui.ts
├── contexts
│   ├── AnalyticsContext.tsx
│   ├── AppUpdatesContext.tsx
│   ├── ItemsContext.tsx
│   ├── NavigatorTreeContext.tsx
│   └── SettingsContext.tsx
├── definitions
│   └── daemon.d.ts
├── entity
│   ├── actions.ts
│   ├── entities
│   │   ├── applicationCache.entity.tsx
│   │   ├── applicationInstance.entity.ts
│   │   ├── applicationLogger.entity.ts
│   │   ├── folderApplication.entity.ts
│   │   ├── instanceBean.entity.ts
│   │   ├── instanceCache.entity.tsx
│   │   ├── instanceEnv.entity.ts
│   │   ├── instanceFlywayMigration.entity.ts
│   │   ├── instanceHeapdumpReferences.entity.tsx
│   │   ├── instanceHttpRequest.entity.ts
│   │   ├── instanceLiquibaseChangeSetEntity.ts
│   │   ├── instanceLogger.entity.ts
│   │   ├── instanceMappingsDispatcherServletOrHandlerEntity.ts
│   │   ├── instanceMappingsServletEntity.ts
│   │   ├── instanceMappingsServletFilterEntity.ts
│   │   ├── instanceMetric.entity.ts
│   │   ├── instanceQuartzJob.entity.ts
│   │   ├── instanceQuartzTrigger.entity.ts
│   │   ├── instanceScheduledTasksCron.entity.ts
│   │   ├── instanceScheduledTasksCustom.entity.ts
│   │   ├── instanceScheduledTasksFixed.entity.ts
│   │   ├── instanceSystemEnvironment.entity.ts
│   │   ├── instanceSystemProperty.entity.ts
│   │   ├── instanceThreadProfilingRequest.entity.tsx
│   │   └── instanceTogglz.entity.ts
│   └── entity.d.ts
├── hooks
│   ├── demo
│   │   ├── useRestartDemo.ts
│   │   ├── useStartDemo.ts
│   │   └── useStopDemo.ts
│   ├── useCopyToClipboard.tsx
│   ├── useDebounceFn.ts
│   ├── useDelayedEffect.ts
│   ├── useElementDocumentHeight.ts
│   ├── useInstanceHealth.ts
│   ├── useItemColor.ts
│   ├── useItemDisplayName.ts
│   ├── useItemEffectiveColor.ts
│   ├── useItemIcon.ts
│   ├── useLocalStorageState.ts
│   ├── useRerenderKey.ts
│   ├── useScrollAndHighlightElement.ts
│   └── useScrollSync.ts
├── images
│   └── flags
│       ├── gb.svg
│       ├── il.svg
│       └── index.ts
├── index.ejs               -- 页面
├── index.tsx               -- 渲染 App.tsx 到 index.ejs
├── lang
│   ├── entries
│   │   ├── en-US.ts
│   │   └── he-IL.ts
│   ├── index.ts
│   ├── lang.d.ts
│   └── locales
│       ├── en_US.ts
│       └── he_IL.ts
├── layout
│   ├── app
│   │   └── AppLayout.tsx
│   ├── application
│   │   ├── ApplicationLayout.tsx
│   │   └── components
│   │       └── ApplicationSidebar.tsx
│   ├── common
│   │   ├── main-sidebar
│   │   │   ├── MainNavbar.tsx
│   │   │   ├── MainSidebarLayout.tsx
│   │   │   ├── MainSidebarTitle.tsx
│   │   │   └── navbar
│   │   │       ├── AccountMenu.tsx
│   │   │       ├── HelpMenu.tsx
│   │   │       ├── SettingsMenu.tsx
│   │   │       └── WindowControls.tsx
│   │   └── secondary-sidebar
│   │       └── SecondarySidebarLayout.tsx
│   ├── folder
│   │   ├── FolderLayout.tsx
│   │   └── components
│   │       └── FolderSidebar.tsx
│   ├── instance
│   │   ├── InstanceLayout.tsx
│   │   └── components
│   │       ├── InstanceActiveProfiles.tsx
│   │       ├── InstanceSidebar.tsx
│   │       └── health
│   │           ├── DemoInstanceUnreachable.tsx
│   │           ├── InstanceInvalid.tsx
│   │           ├── InstancePending.tsx
│   │           └── InstanceUnreachable.tsx
│   └── navigator
│       ├── NavigatorLayout.tsx
│       └── components
│           ├── NavigatorSidebar.tsx
│           └── sidebar
│               ├── menus
│               │   ├── CreateItemContextMenu.tsx
│               │   ├── CreateItemMenu.tsx
│               │   ├── CreateItemMenuItems.tsx
│               │   └── SearchItemMenu.tsx
│               └── tree
│                   ├── NavigatorTree.tsx
│                   ├── NavigatorTreeNode.tsx
│                   ├── menus
│                   │   ├── ApplicationMenuItems.tsx
│                   │   ├── FolderMenuItems.tsx
│                   │   ├── InstanceMenuItems.tsx
│                   │   ├── ItemContextMenu.tsx
│                   │   ├── ItemMenu.tsx
│                   │   └── items
│                   │       ├── AddApplicationMenuItem.tsx
│                   │       ├── AddFolderMenuItem.tsx
│                   │       ├── AddInstanceMenuItem.tsx
│                   │       ├── ChooseColorMenuItem.tsx
│                   │       ├── CopyIdToClipboardMenuItem.tsx
│                   │       ├── CopyItemToClipboardMenuItem.tsx
│                   │       ├── DeleteMenuItem.tsx
│                   │       ├── RenameMenuItem.tsx
│                   │       ├── StopDemoMenuItem.tsx
│                   │       └── UpdateMenuItem.tsx
│                   └── tree.d.ts
├── pages
│   ├── daemon
│   │   └── unhealthy
│   │       └── index.tsx
│   ├── general
│   │   ├── error
│   │   │   └── index.tsx
│   │   └── graph
│   │       ├── components
│   │       │   ├── CustomNode.tsx
│   │       │   ├── CustomReactFlow.tsx
│   │       │   └── GraphComponent.tsx
│   │       ├── contexts
│   │       │   └── ReactFlowContext.tsx
│   │       ├── index.tsx
│   │       └── utils
│   │           └── reactFlowUtils.ts
│   └── navigator
│       ├── application
│       │   ├── caches
│       │   │   ├── components
│       │   │   │   ├── ApplicationCacheDetails.tsx
│       │   │   │   └── ApplicationCacheStatisticsDialog.tsx
│       │   │   └── index.tsx
│       │   ├── dashboard
│       │   │   └── index.tsx
│       │   ├── instances
│       │   │   └── index.tsx
│       │   └── loggers
│       │       └── index.tsx
│       ├── folder
│       │   └── applications
│       │       └── index.tsx
│       ├── home
│       │   ├── components
│       │   │   ├── HomeDeveloperMode.tsx
│       │   │   ├── HomeDocumentation.tsx
│       │   │   ├── HomeFeedback.tsx
│       │   │   ├── HomeGettingStarted.tsx
│       │   │   ├── HomeRepository.tsx
│       │   │   ├── HomeWelcome.tsx
│       │   │   └── HomeWhatsNew.tsx
│       │   └── index.tsx
│       └── instance
│           ├── beans
│           │   ├── components
│           │   │   ├── BeansGraphDialog.tsx
│           │   │   └── InstanceBeanDetails.tsx
│           │   └── index.tsx
│           ├── beans-graph
│           │   └── index.tsx
│           ├── caches
│           │   ├── components
│           │   │   ├── InstanceCacheDetails.tsx
│           │   │   └── InstanceCacheStatisticsDialog.tsx
│           │   └── index.tsx
│           ├── dashboard
│           │   ├── hooks
│           │   │   └── useDashboardWidgets.ts
│           │   └── index.tsx
│           ├── environment
│           │   └── index.tsx
│           ├── flyway
│           │   ├── components
│           │   │   ├── FlywayMigrationDetails.tsx
│           │   │   └── FlywayMigrationsTable.tsx
│           │   └── index.tsx
│           ├── heapdumps
│           │   └── index.tsx
│           ├── http-requests
│           │   ├── components
│           │   │   ├── InstanceHttpRequestCharts.tsx
│           │   │   └── InstanceHttpRequestDetails.tsx
│           │   └── index.tsx
│           ├── integration-graph
│           │   └── index.tsx
│           ├── liquibase
│           │   ├── components
│           │   │   ├── LiquibaseChangesetDetails.tsx
│           │   │   └── LiquibaseChangesetsTable.tsx
│           │   └── index.tsx
│           ├── loggers
│           │   └── index.tsx
│           ├── mappings
│           │   ├── components
│           │   │   ├── MappingsDispatcherHandlersTable.tsx
│           │   │   ├── MappingsDispatcherServletsTable.tsx
│           │   │   ├── MappingsServletDetails.tsx
│           │   │   ├── MappingsServletFilterDetails.tsx
│           │   │   ├── MappingsServletFiltersTable.tsx
│           │   │   └── MappingsServletsTable.tsx
│           │   └── index.tsx
│           ├── metrics
│           │   ├── components
│           │   │   └── MetricDetails.tsx
│           │   └── index.tsx
│           ├── properties
│           │   ├── components
│           │   │   └── InstancePropertiesCode.tsx
│           │   └── index.tsx
│           ├── quartz
│           │   ├── components
│           │   │   ├── QuartzJobDetails.tsx
│           │   │   ├── QuartzJobsTable.tsx
│           │   │   ├── QuartzTriggerDetails.tsx
│           │   │   ├── QuartzTriggerDetailsDialog.tsx
│           │   │   └── QuartzTriggersTable.tsx
│           │   └── index.tsx
│           ├── scheduled-tasks
│           │   ├── components
│           │   │   ├── ScheduledTasksCronTable.tsx
│           │   │   ├── ScheduledTasksCustomTable.tsx
│           │   │   └── ScheduledTasksFixedTable.tsx
│           │   └── index.tsx
│           ├── system-environment
│           │   └── index.tsx
│           ├── system-properties
│           │   └── index.tsx
│           ├── threaddumps
│           │   ├── components
│           │   │   ├── ThreadLogCell.tsx
│           │   │   ├── ThreadLogDetails.tsx
│           │   │   ├── ThreadLogStackTrace.tsx
│           │   │   ├── ThreadLogsBar.tsx
│           │   │   ├── ThreadLogsTimeline.tsx
│           │   │   └── ThreadProfilingRequestDetailsDialog.tsx
│           │   ├── contexts
│           │   │   └── ThreadLogContext.tsx
│           │   └── index.tsx
│           └── togglz
│               ├── components
│               │   ├── TogglzDetails.tsx
│               │   └── TogglzGroupTable.tsx
│               └── index.tsx
├── renderer.md
├── routes
│   ├── ErrorBoundaryNavigator.tsx
│   ├── guards
│   │   ├── AbilityRedirectGuard.tsx
│   │   └── InstanceAbilityErrorGuard.tsx
│   ├── routes.tsx
│   └── urls.ts
├── theme
│   ├── GlobalStyles.tsx
│   ├── ThemeConfig.tsx
│   ├── config
│   │   ├── breakpoints.ts
│   │   ├── palette.ts
│   │   ├── shadows.ts
│   │   ├── shape.ts
│   │   └── typography.ts
│   ├── cssStyles.ts
│   └── overrides
│       ├── Accordion.ts
│       ├── Alert.tsx
│       ├── AppBar.ts
│       ├── Autocomplete.ts
│       ├── Avatar.ts
│       ├── Backdrop.ts
│       ├── Badge.ts
│       ├── Breadcrumbs.ts
│       ├── Button.ts
│       ├── ButtonGroup.ts
│       ├── Card.ts
│       ├── Checkbox.tsx
│       ├── Chip.tsx
│       ├── Container.ts
│       ├── ControlLabel.ts
│       ├── CustomIcons.tsx
│       ├── DataGrid.tsx
│       ├── Dialog.ts
│       ├── Drawer.ts
│       ├── Fab.ts
│       ├── Grid.ts
│       ├── IconButton.ts
│       ├── Input.ts
│       ├── Link.ts
│       ├── Lists.ts
│       ├── LoadingButton.ts
│       ├── Menu.ts
│       ├── Pagination.ts
│       ├── Paper.ts
│       ├── Pickers.ts
│       ├── Popover.ts
│       ├── Progress.ts
│       ├── Radio.ts
│       ├── Rating.tsx
│       ├── Select.ts
│       ├── Skeleton.ts
│       ├── Slider.ts
│       ├── Snackbar.ts
│       ├── Stepper.ts
│       ├── SvgIcon.ts
│       ├── Switch.ts
│       ├── Table.ts
│       ├── Tabs.ts
│       ├── Timeline.ts
│       ├── ToggleButton.ts
│       ├── Tooltip.ts
│       ├── Typography.ts
│       └── index.ts
└── utils
    ├── classUtils.ts
    ├── dialogUtils.tsx
    ├── elementUtils.ts
    ├── errorUtils.ts
    ├── formatUtils.ts
    ├── highlightUtils.ts
    ├── itemUtils.tsx
    ├── objectUtils.ts
    ├── platformUtils.ts
    ├── treeUtils.ts
    └── urlUtils.ts

```