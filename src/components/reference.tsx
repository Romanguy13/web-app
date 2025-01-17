import React from 'react';
import Coin from './img/coin';
import Link from 'next/link';

export default function Reference() {
  return (
    <div className="m-4 flex flex-col justify-between gap-4 md:flex-row">
      <div className="flex w-full grow flex-col rounded-md border-2 border-primary">
        <div className="w-full border-b-2 border-primary p-4">
          <h1 className="text-3xl font-bold tracking-wide">For Reference</h1>
        </div>
        <div className="flex grow border-b-2 border-primary text-xl">
          <div className="w-1/2 border-r-2 border-primary p-4 md:w-2/3">
            <p className="">
              Checkout our blog for the latest news and updates.
            </p>
          </div>
          <Link href="/blog">
            <div className="w-1/2 cursor-pointer bg-base-300 p-4 transition-all hover:bg-accent hover:text-base-100 md:w-1/3">
              <p className="mb-4">Blog</p>
            </div>
          </Link>
        </div>
        <div className="flex grow border-primary text-xl">
          <div className="w-1/2 border-r-2 border-primary p-4 md:w-2/3">
            <p className="">Have a question? Check out our FAQ for answers.</p>
          </div>
          <Link href="/docs/faq">
            <div className="w-1/2 cursor-pointer rounded-b-md rounded-b-md bg-base-300 p-4 transition-all hover:rounded-b-none hover:bg-accent hover:text-base-100 md:w-1/3">
              <p className="mb-4">FAQ</p>
            </div>
          </Link>
        </div>
      </div>
      <div className="flex w-full grow flex-col items-center justify-center rounded-md border-2 border-primary p-4 md:w-1/3">
        <Coin />
      </div>
    </div>
  );
}
