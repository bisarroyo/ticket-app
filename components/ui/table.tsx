import { cn } from '@/lib/utils'
import React from 'react'

const Table: React.FC<React.HTMLAttributes<HTMLTableElement>> = ({
  className,
  ...props
}) => {
  return (
    <table
      className={cn('w-full caption-bottom text-md text-left', className)}
      {...props}
    />
  )
}
Table.displayName = 'Table'

const TableHeader: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  className,
  ...props
}) => {
  return (
    <thead className={cn('w-full text-md text-left', className)} {...props} />
  )
}
TableHeader.displayName = 'TableHeader'

const TableBody: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  className,
  ...props
}) => {
  return (
    <tbody className={cn('w-full text-md text-left', className)} {...props} />
  )
}
TableBody.displayName = 'TableBody'

const TableFooter: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  className,
  ...props
}) => {
  return (
    <tfoot className={cn('w-full text-md text-left', className)} {...props} />
  )
}
TableFooter.displayName = 'TableFooter'

const TableRow: React.FC<React.HTMLAttributes<HTMLTableRowElement>> = ({
  className,
  ...props
}) => {
  return <tr className={cn('w-full text-md text-left', className)} {...props} />
}
TableRow.displayName = 'TableRow'

const TableCell: React.FC<React.HTMLAttributes<HTMLTableCellElement>> = ({
  className,
  ...props
}) => {
  return <td className={cn('w-full text-md text-left', className)} {...props} />
}
TableCell.displayName = 'TableCell'

const TableHead: React.FC<React.HTMLAttributes<HTMLTableCellElement>> = ({
  className,
  ...props
}) => {
  return <th className={cn('w-full text-md text-left', className)} {...props} />
}
TableHead.displayName = 'TableHead'

const TableCaption: React.FC<React.HTMLAttributes<HTMLTableCaptionElement>> = ({
  className,
  ...props
}) => {
  return (
    <caption
      className={cn('w-full text-md text-right pt-3', className)}
      {...props}
    />
  )
}
TableCaption.displayName = 'TableCaption'

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  TableHead,
  TableCaption
}
