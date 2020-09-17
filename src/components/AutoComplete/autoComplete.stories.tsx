import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions'
import { AutoComplete, AutoCompleteProps, DataSourceType } from './autoComplete'

export default {
    title: 'Example/AutoComplete',
    component: AutoComplete
} as Meta;

interface GithubUserProps {
    login: string;
    url: string;
    avatar_url: string;
}

const SimpleComplete = () => {
    const lakersWithNumber = [
        { value: 'bradley', number: 11 },
        { value: 'pope', number: 1 },
        { value: 'caruso', number: 4 },
        { value: 'cook', number: 2 },
        { value: 'cousins', number: 15 },
        { value: 'james', number: 23 },
        { value: 'AD', number: 3 },
        { value: 'green', number: 14 },
        { value: 'howard', number: 39 },
        { value: 'kuzma', number: 0 },
    ]
    const handleFetch = (query: string) => {
        return lakersWithNumber.filter(player => player.value.includes(query) && query.length > 0)
    }
    // const handleFetch = (query: string) => {
    //     return fetch(`https://api.github.com/search/users?q=${query}`)
    //         .then(res => res.json())
    //         .then(({ items }) => {
    //             return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item }))
    //         })
    // }

    // const renderOption = (item: DataSourceType) => {
    //     const itemWithGithub = item as DataSourceType<GithubUserProps>
    //     return (
    //         <>
    //             <h6>Name: {itemWithGithub.value}</h6>
    //             <p>url: {itemWithGithub.url}</p>
    //         </>
    //     )
    // }
    return (
        <AutoComplete
            fetchSuggestions={handleFetch}
            onSelect={action('selected')}
            style={{ width: 300 }}
           // renderOption={renderOption}
        />
    )
}

const Template: Story<AutoCompleteProps> = (args: AutoCompleteProps) => (<SimpleComplete {...args} />);

export const defaultAutoComplete = Template.bind({});
