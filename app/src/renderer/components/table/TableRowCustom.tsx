import { Box, Checkbox, TableCell, TableRow, Tooltip } from '@mui/material';
import { EntityColumn } from 'renderer/entity/entity';
import { useTable } from 'renderer/components/table/TableContext';
import React, { useCallback, useMemo } from 'react';
import TableCellData from 'renderer/components/table/data/TableCellData';
import TableRowAction from 'renderer/components/table/action/TableRowAction';
import { alpha } from '@mui/material/styles';
import ToolbarButton from '../common/ToolbarButton';
import { FormattedMessage } from 'react-intl';
import { isBoolean } from 'lodash';
import { useAnalytics } from '../../contexts/AnalyticsContext';

type TableRowCustomProps<EntityItem> = {
  row: EntityItem;
};

export default function TableRowCustom<EntityItem>({ row }: TableRowCustomProps<EntityItem>) {
  const {
    entity,
    selectedRows,
    selectRowHandler,
    isRowSelected,
    openRows,
    toggleRowOpenHandler,
    isRowOpen,
    hasActions,
    hasMassActions,
    actionsHandler,
  } = useTable<EntityItem, unknown>();
  const { track } = useAnalytics();

  const [loadingActionIds, setLoadingActionIds] = React.useState<string[]>([]);

  const selected = useMemo<boolean>(() => isRowSelected(row), [row, selectedRows, isRowSelected]);
  const open = useMemo<boolean>(() => isRowOpen(row), [row, openRows, isRowOpen]);
  const hasDetailsRowAction = useMemo<boolean>(() => entity.rowAction?.type === 'Details', [entity]);
  const hasActiveRowAction = useMemo<boolean>(() => !!entity.rowAction, [entity]);
  const anchor = useMemo<string | undefined>(() => entity.getAnchor?.(row), [row, entity]);

  const rowClickHandler = useCallback(
    (event: React.MouseEvent): void => {
      if (!hasActiveRowAction) {
        return;
      }
      toggleRowOpenHandler(row);
    },
    [hasActiveRowAction, toggleRowOpenHandler]
  );

  const checkboxClickHandler = useCallback(
    (event: React.MouseEvent): void => {
      event.stopPropagation();
      selectRowHandler(row);
    },
    [selectRowHandler]
  );

  const actionClickHandler = useCallback(
    async (event: React.MouseEvent, actionId: string): Promise<void> => {
      event.stopPropagation();

      setLoadingActionIds((prev) => [...prev, actionId]);

      track({ name: 'table_row_action', properties: { table: entity.id, action: actionId } });
      await actionsHandler(actionId, row);

      setLoadingActionIds((prev) => prev.filter((id) => id !== actionId));
    },
    [actionsHandler, setLoadingActionIds]
  );

  return (
    <>
      <TableRow
        id={anchor}
        hover
        selected={selected}
        onClick={rowClickHandler}
        sx={{
          ...(hasActiveRowAction ? { cursor: 'pointer' } : {}),
          ...(open
            ? {
                backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
                '&:hover': { backgroundColor: (theme) => `${alpha(theme.palette.primary.main, 0.16)}!important` },
              }
            : {}),
        }}
      >
        {hasMassActions && (
          <TableCell padding="checkbox">
            <Checkbox checked={selected} onClick={checkboxClickHandler} />
          </TableCell>
        )}
        {hasDetailsRowAction && (
          <TableCell sx={{ pr: 0 }}>
            <ToolbarButton
              tooltip={<FormattedMessage id={open ? 'collapseDetails' : 'expandDetails'} />}
              icon={open ? 'KeyboardArrowDown' : 'KeyboardArrowRight'}
              disabled={!hasActiveRowAction}
            />
          </TableCell>
        )}

        {entity.columns.map((column: EntityColumn<EntityItem>) => {
          const tooltip = column.getTooltip?.(row);
          return (
            <TableCell align={column.align || 'left'} sx={{ wordBreak: 'break-word' }} key={column.id}>
              <Tooltip title={tooltip} disableInteractive={false}>
                <Box component={'span'}>
                  <TableCellData row={row} column={column} />
                </Box>
              </Tooltip>
            </TableCell>
          );
        })}

        {hasActions && (
          <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
            {entity.actions.map((action) => {
              const disabled = action.isDisabled?.(row);
              const loading = loadingActionIds.includes(action.id);
              const tooltip = !disabled || isBoolean(disabled) ? <FormattedMessage id={action.labelId} /> : disabled;
              return (
                <ToolbarButton
                  tooltip={tooltip}
                  icon={action.icon}
                  disabled={!!disabled || loading}
                  onClick={(event) => actionClickHandler(event, action.id)}
                  key={action.id}
                />
              );
            })}
          </TableCell>
        )}
      </TableRow>

      {hasActiveRowAction && <TableRowAction row={row} action={entity.rowAction!} open={open} />}
    </>
  );
}
