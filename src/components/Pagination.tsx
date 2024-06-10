"use client";

import {
  Pagination as PaginationCmp,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
  page: number; // start from 0
  totalPage: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ page, totalPage, onPageChange }: Props) {
  const showPageItems = () => {
    const data = [];
    const curr = page + 1;
    const numPage = 3;
    const maxLimit = totalPage || 1;

    if (maxLimit <= numPage) {
      for (let i = 1; i <= maxLimit; i++) {
        data.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={curr === i}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(i);
              }}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      const leftside = curr - numPage / 2 > 2;
      const rightside = curr + numPage <= maxLimit - 1;
      const str = Math.max(2, Math.round(curr - numPage / 2));
      const end = Math.min(9, Math.round(curr + numPage / 2));

      if (curr > 1) {
        data.push(
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(page - 1);
              }}
            />
          </PaginationItem>
        );
      }

      data.push(
        <PaginationItem>
          <PaginationLink
            href="#"
            isActive={curr === 1}
            onClick={(e) => {
              e.preventDefault();
              onPageChange(0);
            }}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (leftside) {
        data.push(
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      for (let i = str; i <= end; i++) {
        data.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={curr === i}
              onClick={(e) => {
                console.log(i);
                e.preventDefault();
                onPageChange(i - 1);
              }}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (rightside) {
        data.push(
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      data.push(
        <PaginationItem>
          <PaginationLink
            href="#"
            isActive={curr === maxLimit}
            onClick={(e) => {
              e.preventDefault();
              onPageChange(maxLimit - 1);
            }}
          >
            {maxLimit}
          </PaginationLink>
        </PaginationItem>
      );

      if (curr < maxLimit) {
        data.push(
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(page + 1);
              }}
            />
          </PaginationItem>
        );
      }
    }
    return data;
  };

  return (
    <PaginationCmp>
      <PaginationContent>{showPageItems()}</PaginationContent>
    </PaginationCmp>
  );
}
