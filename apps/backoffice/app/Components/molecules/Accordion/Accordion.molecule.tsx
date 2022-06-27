import React, { useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { AccordionHeader } from './Accordion.molecule.styled';

type AccodionContent = {
    title: string;
    content: string | React.ReactNode;
};

type AccordionProps = {
    datas: Array<AccodionContent>;
};

const Accordion: React.FC<AccordionProps> = ({ datas }) => {
    return (
        <div id="accordion">
            {datas.map((data, index) => (
                <div className="card" key={data?.title}>
                    <AccordionHeader
                        className="card-header"
                        id="headingOne"
                        data-toggle="collapse"
                        data-target={`#collapse${index}`}
                    >
                        <h5 className="mb-0">
                            <button
                                className="btn btn-link"
                                aria-expanded="true"
                                aria-controls="collapseOne"
                            >
                                {data.title}
                            </button>
                        </h5>

                        <MdKeyboardArrowDown className="rotate-icon" />
                    </AccordionHeader>

                    <div
                        id={`collapse${index}`}
                        className="collapse"
                        aria-labelledby="headingOne"
                        data-parent="#accordion"
                    >
                        <div className="card-body">{data.content}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Accordion;
