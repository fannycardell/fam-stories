import { FormEvent, useState } from "react";
import { updateRelationship } from "../store/familyMembersSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import styled from "styled-components";
import { BodyText, AddButton, Label } from "./GlobalStyles";
import { useParams } from 'react-router-dom';
import { FamilyMember, listOfRelationShipTypes } from "@fam-stories/common-utils";

export const AddRelationship = () => {
    const [toFamilyMemberId, setToFamilyMemberId] = useState('');
    const [relationtype, setRelationtype] = useState('');

    const familyMembers = useAppSelector<FamilyMember[]>(state => state.familyMembers.familyMembers);
    const { familyMemberId } = useParams();
    const familyMember = familyMembers.find(familyMember => familyMember._id === familyMemberId);

    const dispatch = useAppDispatch();
    
    const onSubmit = (e: FormEvent) => {
        e.preventDefault()
        if(familyMemberId) {
            dispatch(updateRelationship({fromFamilyMemberId: familyMemberId, toFamilyMemberId, relationtype}))
        }
    }

    const relationOptionlist = [
        <option value="">Select a relation</option>,
        ...listOfRelationShipTypes.map((relationtype) => {return <option value={relationtype}>{relationtype}</option>})]
    const familymemberOptionList = [
        <option value="">Select a family member</option>, //sort by letters?
        ...familyMembers.map((familyMember) => {return <option value={familyMember._id}>{familyMember.name}</option>})
    ];
    
    const relationshipList = familyMember?.relationships ? familyMember?.relationships.map((relationship, index) => { 
        const member = familyMembers.find(familyMember => familyMember._id === relationship.familyMemberId);
        return <div key={index}>
            {relationship.relationtype} 
            <BodyText>to</BodyText>
            { member?.name }
            </div>
    }) : [];

    return <RelationForm onSubmit={onSubmit}>
        {relationshipList}
        <Label aria-label="type of relationship" htmlFor="relationtype"></Label>
        <Select id="relationtype" 
                value={relationtype} 
                onChange={e => setRelationtype(e.target.value)}>{relationOptionlist}</Select>       
        <Label aria-label="familymember to" htmlFor="toFamilyMemberId">to</Label>
        <Select id="toFamilyMemberId" 
                value={toFamilyMemberId} 
                onChange={e => setToFamilyMemberId(e.target.value)}>{familymemberOptionList}</Select>
        <AddButton disabled={toFamilyMemberId === '' || relationtype === ''} aria-label="add relation" type="submit">Add relation</AddButton>
    </RelationForm>
};

export const RelationForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0.5em;
    margin: 0.5em;
    width: 12em;
    box-shadow: 5px 5px 5px grey;
    background-color: var(--color-green);
    border: 1px solid var(--color-darkerGreen);
    font-family: 'Open Sans';
    font-weight: 400;
    border-radius: 0.5em;
`

export const Select = styled.select`
    background-color: var(--color-white);
    margin: 0.75em;
    border-radius: 0.25em;
`