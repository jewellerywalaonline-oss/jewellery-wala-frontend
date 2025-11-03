"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from "@/components/comman/ProductCard";
import { Button } from "@/components/ui/button";

export default function TabProducts({ data }) {
  return (
    <section id={"Products For You"}>
      <div className="max-w-7xl mx-auto px-1 sm:px-4 lg:pb-10">
        <Tabs defaultValue="silver" className="w-full">
          <TabsList className="grid w-fit grid-cols-3 bg-transparent border-b border-gray-200 h-auto p-0 rounded-none gap-0 mx-auto">
            <TabsTrigger value="silver" className={Css()}>
              Silver
            </TabsTrigger>
            <TabsTrigger value="gold" className={Css()}>
              Gold
            </TabsTrigger>
            <TabsTrigger value="gift" className={Css()}>
              Gift
            </TabsTrigger>
          </TabsList>

          <h2 className="text-3xl font-bold text-amber-800 text-center mb-8 mt-6 capitalize">
            <TabsContent value="silver" className="m-0">
              Silver Collection
            </TabsContent>
            <TabsContent value="gold" className="m-0">
              Gold Collection
            </TabsContent>
            <TabsContent value="gift" className="m-0">
              Gift Collection
            </TabsContent>
          </h2>

          <TabsContent value="silver" className="m-0 ">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-6">
              {data?.silver?.map((p, i) => (
                <div key={p._id}>
                  <ProductCard key={p._id} data={p} />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="gold" className="m-0">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-6">
              {data?.gold?.map((p, i) => (
                <div key={p._id}>
                  <ProductCard key={p._id} data={p} />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="gift" className="m-0">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-6">
              {data?.gift?.map((p, i) => (
                <div key={p._id}>
                  <ProductCard key={p._id} data={p} />
                </div>
              ))}
            </div>
          </TabsContent>

          <div className="flex justify-center mt-10 ">
            <Button className="bg-gradient-to-r from-amber-500 to-yellow-500 text-gray-900 px-10 py-3 rounded-full font-semibold text-sm uppercase hover:shadow-lg hover:scale-105 transition-all">
              View More
            </Button>
          </div>
        </Tabs>
      </div>
    </section>
  );
}

const Css = () => {
  return "px-6 pt-3 pb-[14px] font-bold text-base uppercase rounded-none border-transparent text-gray-500 hover:text-gray-700 transition-all bg-transparent data-[state=active]:text-amber-800 data-[state=active]:bg-clip-padding data-[state=active]:pb-3 data-[state=active]:shadow-none data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-700 data-[state=active]:via-orange-400 data-[state=active]:to-amber-700 data-[state=active]:[background-size:100%_3px] data-[state=active]:[background-repeat:no-repeat] [background-position:bottom] data-[state=active]:animate-in";
};
