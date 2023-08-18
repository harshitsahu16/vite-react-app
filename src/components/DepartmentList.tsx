import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Checkbox, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './DepartmentList.css';

const departmentsData = [
  {
    "department": "customer_service",
    "sub_departments": [
      "support",
      "customer_success"
    ]
  },
  {
    "department": "design",
    "sub_departments": [
      "graphic_design",
      "product_design",
      "web_design"
    ]
  }
];

const DepartmentList: React.FC = () => {
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedSubDepartments, setSelectedSubDepartments] = useState<string[]>([]);

  const handleDepartmentSelect = (department: string) => {
    const newSelectedDepartments = selectedDepartments.includes(department)
      ? selectedDepartments.filter(dep => dep !== department)
      : [...selectedDepartments, department];

    setSelectedDepartments(newSelectedDepartments);
    updateSelectedSubDepartments(newSelectedDepartments);
  };

  const handleSubDepartmentSelect = (subDepartment: string, department: string) => {
    const newSelectedSubDepartments = selectedSubDepartments.includes(subDepartment)
      ? selectedSubDepartments.filter(subDep => subDep !== subDepartment)
      : [...selectedSubDepartments, subDepartment];

    setSelectedSubDepartments(newSelectedSubDepartments);
    updateSelectedDepartments(department, newSelectedSubDepartments);
  };

  const updateSelectedSubDepartments = (newSelectedDepartments: string[]) => {
    const newSelectedSubs: string[] = [];
    departmentsData.forEach(dep => {
      if (newSelectedDepartments.includes(dep.department)) {
        dep.sub_departments.forEach(subDep => {
          if (selectedSubDepartments.includes(subDep)) {
            newSelectedSubs.push(subDep);
          }
        });
      }
    });
    setSelectedSubDepartments(newSelectedSubs);
  };

  const updateSelectedDepartments = (department: string, newSelectedSubs: string[]) => {
    const dep = departmentsData.find(dep => dep.department === department);
    if (dep) {
      const allSubsSelected = dep.sub_departments.every(subDep => newSelectedSubs.includes(subDep));
      if (allSubsSelected) {
        setSelectedDepartments(prevSelectedDepartments =>
          Array.from(new Set([...prevSelectedDepartments, department]))
        );
      } else {
        setSelectedDepartments(prevSelectedDepartments =>
          prevSelectedDepartments.filter(dep => dep !== department)
        );
      }
    }
  };

  return (
    <div className="department-list-container">
      {departmentsData.map(departmentItem => (
        <Accordion className="department-accordion" key={departmentItem.department}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Checkbox
              checked={selectedDepartments.includes(departmentItem.department)}
              onChange={() => handleDepartmentSelect(departmentItem.department)}
            />
            <Typography className="department-title">{departmentItem.department}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="sub-department-list-container">
              {departmentItem.sub_departments.map(subDepartment => (
                <div className="sub-department-item" key={subDepartment}>
                  <Checkbox
                    className="sub-department-checkbox"
                    checked={selectedSubDepartments.includes(subDepartment)}
                    onChange={() => handleSubDepartmentSelect(subDepartment, departmentItem.department)}
                  />
                  <Typography className='sub-department-title' >{subDepartment}</Typography>
                </div>
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default DepartmentList;
