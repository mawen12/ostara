# Table Component

丰富的表数据功能，功能如下：
- 展示
- 分页
- 排序
- 过滤
- 勾选
- 打开
- 空数据
- 加载中
- 单行操作/多行操作/全局操作/高亮跳转


## 面向业务的功能，TableComponent

- `entity` 提供操作的列， `entity.columns`，即可用于展示的列
- `hiddenColumnIds` 隐藏列，`String[]`
- `loading` 加载中, `queryState.isLoading`
- `data` 展示数据, `queryState.data`
- `emptyContent` 没有数据展示的空白内容，`No Data`
- `actionsHandler` 行级操作，`async (actionId, row) => {}`
- `massActionsHandler` 批量操作，`async (actionId, selectedRows) => {}`
- `globalActionsHandler` 全局操作, `async (actionId) => {}`
- `refetchHandler` 刷新数据操作, `queryState.refetch`

## 逻辑，TableContext

根据 TableComponent 进行转换。

### Entity

- `id` 业务标识
- `columns` 可展示的列集合，列具有不同的类型，
- `actions` 该实体支持的操作集合，由 `id`， `labelId`, `icon`, `isDisabled` 组成
- `massActions` 该实体支持的批量操作
- `globalActions` 该实体支持的全局操作，有 `Navigate` 和 `Details`
- `rowAction` 该实体支持的列操作
- `defaultOrder` 排序，由 `id`, `direction` 组成
- `paging` 是否支持分页
- `getId` 返回实体id
- `getAnchor`
- `filterData` 过滤数据
- `CustomFiltersComponent` 自定义过滤器

列支持一下特性
- `id` 唯一标识
- `align` 位置
- `labelId` 
- `width` 宽度
- `getTooltip` 提示
- `type` 类型 `Text`, `Number`, `Cron`, `Date`, `Boolean`, `ParsedDate`, `Bytes`, `Label`, `Countdown`, `Interval`, `CustomText`, `Custom`

### visibleColumns

根据 `entity.columns` 过滤掉 `hiddenColumnIds` 得出

### rows == filteredTableData

将 `data` => `filter` => `order` 后得到的结果 

### displayTableData

将 `filteredTableData` => `paging` 后得到的结果

### selectedRows

将 `filteredTableData` => `selected` 后得到的结果

### hasSelectedRows

将 `filteredTableData` => `selected` => `notEmpty` 后得到的结果

### selectRowHandler

`row` => `add to selected` / `remove from selected`

### isRowSelected

将 `selected` => `contains` 后得到的结果

### selectAllIndeterminate

将 `selected` => `notEmpty` && `selected` <= `filteredTableData` 后得到的结果

### selectAllChecked

将 `selected` => `notEmpty` && `selected` === `filteredTableData` 后得到的结果

### selectAllRowsHandler

将 `filteredTableData` => `add all to selected` 

### openRows

`filteredTableData` => `opended`

### toggleRowOpenHandler

`row` => `add to opened` / `remove from opened`

### closeAllRowsHandler

`opened` => []

### isRowOpen

`row` => `opended`

### empty

`!loading` && `filteredTableData` => `notEmpty`

### page

current page

### changePageHandler

`num` => `page`

### rowsPerPage

[10, 25, 50]

`DEFAULT_ROWS_PER_PAGE` => `localStorage(tableRowsPerPage)`

### changeRowsPerPageHandler

`num` => `rowPerPage`
`0` => `page`

### filter

过滤器

### changeFilterHandler

`newFilter` => `filter`
`0` => `page`

### customFilters

过滤器

### changeCustomFiltersHandler

`newFilter` => `customFilters`
`0` => `page`

### clearFiltersHandler

`` => `filter`
`undefined` => `customFilters`
`0` => `page`

### orderColumn

排序列

### orderDirection

排列方向

### changeOrderHandler

`columnId` => `orderColumn`
`desc` => `orderDirection`

### hasActions

`entity.actions` => `notEmpty`

### hasMassActions

`entity.massActions` => `notEmpty`

### hasGlobalActions

`entity.globalActions` => `notEmpty`

### highlightHandler

`entity.anchor` => `notEmpty` => ``

## 页面 TableCustom

### TableToolbar

提供搜索框，展示 `filter`，对应的 `changeFilterHandler`。
展示全局操作 `globalActions`，例如 instanceTogglz.entity
展示刷新操作 `refreshHandler`

### TableContainer

选择框，用于全局勾选
展示批量操作 `massActions`
表内容

### PerfectScrollbar

滚动

### TablePagination

展示表的分页信息和分页行为


